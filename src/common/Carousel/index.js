/**
 * Created by zhuzi on 28/12/2016.
 * 通用列表/轮播组件
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import './Carousel.css';
import prevArrow from './prev.png';
import nextArrow from './next.png';

const maxPageSlideWidth = 900;
const maxPageSlideHeight = 611;

class Carousel extends PureComponent {
    constructor(props) {
        super(props);
        const { query } = this.props.router.location;
        this.state = {
            activePageIndex: query.page ? parseInt(query.page, 10) : 1,
            rows: 0,
            cols: 0,
            minCellWidth: maxPageSlideWidth / this.props.maxCols,
            minCellHeight: maxPageSlideHeight / this.props.maxRows,
            cellsPerPage: 0,
            pages: 0,
            pageSlideWidth: 0,
            pageSlideHeight: 0,
            resizing: false,
        };
        this.container = null;
        this.resizeTimer = null;
        this._clickHandler = this._clickHandler.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this._onResize = this._onResize.bind(this);
        this._getElemWidth = this._getElemWidth.bind(this);
        this._getElemHeight = this._getElemHeight.bind(this);
        this._adjustLayout = this._adjustLayout.bind(this);
        this._updateGrid = this._updateGrid.bind(this);
    }

    componentDidMount() {
        const containerWidth = this._getElemWidth(ReactDOM.findDOMNode(this.container));
        const containerHeight = this._getElemHeight(ReactDOM.findDOMNode(this.container));
        this._adjustLayout(containerWidth, containerHeight);
    }

    componentWillMount() {
        window.addEventListener('keydown', this._onKeyPress);
        window.addEventListener('resize', this._onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._onKeyPress);
        window.removeEventListener('resize', this._onResize);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
            const { query } = this.props.router.location;
            this.setState({
                activePageIndex: query.page ? parseInt(query.page, 10) : 1,
                pages: Math.ceil(nextProps.dataSource.length / (nextProps.maxRows * nextProps.maxCols)),
                cellsPerPage: nextProps.maxRows * nextProps.maxCols,
            });
        }
    }

    _updateGrid() {
        // 更新排列 state
        const { rows, cols, minCellWidth, minCellHeight, resizing } = this.state;
        const { dataSource } = this.props;
        const { query } = this.props.router.location;
        this.setState((prevState) => {
            let newActivePageIndex;
            if (resizing) {
                const isOverAllPages = parseInt(query.page, 10) <= Math.ceil(dataSource.length / (rows * cols));
                newActivePageIndex = (query.page && isOverAllPages) ? parseInt(query.page, 10) : 1;
                // query中页码超过更新后总页数, 则 set 回 page = 1
                if (prevState.activePageIndex !== newActivePageIndex) {
                    query.page = newActivePageIndex;
                    this.props.router.push(this.props.router.location);
                }
            } else {
                query.page = prevState.activePageIndex;
                this.props.router.push(this.props.router.location);
            }

            return {
                cellsPerPage: rows * cols,
                pages: Math.ceil(dataSource.length / (rows * cols)),
                pageSlideWidth: cols * minCellWidth,
                pageSlideHeight: rows * minCellHeight,
                activePageIndex: newActivePageIndex || prevState.activePageIndex,
            };
        });
    }

    _adjustLayout(containerWidth, containerHeight) {
        const { maxRows, maxCols } = this.props;
        const { minCellWidth, minCellHeight } = this.state;

        if (containerWidth <= 1000 || containerHeight <= 670) {
            // 通过获取 container 宽高, 计算可以放置多少 row/col, 再更新 state
            for (let i = 0; i < maxCols; i++) {
                if (containerWidth >= i * minCellWidth && containerWidth < (i + 1) * minCellWidth) {
                    this.setState({
                        cols: (i <= 1 ? 1 : i),
                    }, () => {
                        this._updateGrid();
                    });
                } else if (containerWidth >= maxCols * minCellWidth) {
                    this.setState({
                        cols: maxCols,
                    }, () => {
                        this._updateGrid();
                    });
                }
            }
            for (let i = 0; i < maxRows; i++) {
                if (containerHeight >= i * minCellHeight && containerHeight < (i + 1) * minCellHeight) {
                    this.setState({
                        rows: (i <= 1 ? 1 : i),
                    }, () => {
                        this._updateGrid();
                    });
                } else if (containerHeight >= maxRows * minCellHeight) {
                    this.setState({
                        rows: maxRows,
                    }, () => {
                        this._updateGrid();
                    });
                }
            }
        } else {
            this.setState({
                rows: maxRows,
                cols: maxCols,
                minCellWidth: containerWidth * 0.9 / maxCols,
                minCellHeight: containerHeight * 0.9 / maxRows,
            }, () => {
                this._updateGrid();
            });
        }
    }

    _getElemWidth(element) {
        return element && element.getBoundingClientRect().width;
    }

    _getElemHeight(element) {
        return element && element.getBoundingClientRect().height;
    }

    _onResize(e) {
        clearTimeout(this.resizeTimer);
        const containerWidth = this._getElemWidth(ReactDOM.findDOMNode(this.container));
        const containerHeight = this._getElemHeight(ReactDOM.findDOMNode(this.container));
        this.setState({ resizing: true }, () => {
            this._adjustLayout(containerWidth, containerHeight);
        });
        // setTimeOut fake an end-of-resize event
        this.resizeTimer = setTimeout(() => {
            this.setState({ resizing: false });
        }, 500);
    }

    _onKeyPress(e) {
        if (this.props.shortcut) {
            if ((e.code === 'ArrowRight' || e.keyCode === 39) && (this.state.activePageIndex !== this.state.pages && this.state.pages > 0)) {
                e.preventDefault();
                return this._clickHandler('next');
            }
            if ((e.code === 'ArrowLeft' || e.keyCode === 37) && (this.state.activePageIndex !== 1)) {
                e.preventDefault();
                return this._clickHandler('prev');
            }
        }
    }

    _clickHandler(msg) {
        const route = this.props.router.location;
        if (msg === 'prev') {
            route.query.page = this.state.activePageIndex - 1;
            this.setState(prevState => ({ activePageIndex: prevState.activePageIndex - 1 }));
            this.props.router.push(route);
        } else if (msg === 'next') {
            route.query.page = this.state.activePageIndex + 1;
            this.setState(prevState => ({ activePageIndex: prevState.activePageIndex + 1 }));
            this.props.router.push(route);
        }
    }

    renderPrevArrow() {
        return (
            <button type="button" onClick={this._clickHandler.bind(this, 'prev')} className="arrow prev">
                <img src={prevArrow} alt="prev" />
            </button>
        );
    }

    renderNextArrow() {
        return (
            <button type="button" onClick={this._clickHandler.bind(this, 'next')} className="arrow next">
                <img src={nextArrow} alt="next" />
            </button>
        );
    }

    renderPages() {
        return (
            <div className="page-number text">
                {this.state.activePageIndex}/{this.state.pages}
            </div>
        );
    }

    renderPageList() {
        const { dataSource, renderCell } = this.props;
        const { pages, pageSlideWidth, activePageIndex, pageSlideHeight, rows, cols, resizing } = this.state;
        const cellsPerPage = rows * cols;
        const pageSlideStyle = {
            width: `${pageSlideWidth}px`,
            height: `${pageSlideHeight}px`,
        };

        const slides = [];
        for (let i = 0; i < pages; i++) {
            const slide = (
                <div data-index={i} key={`page${i}`} className="page-flex" style={pageSlideStyle}>
                    {dataSource.slice(i * cellsPerPage, i !== pages ? (i + 1) * cellsPerPage : dataSource.length).map(cell => (
                        <div
                            key={cell.id}
                            className="page-item"
                            style={{
                                width: `${pageSlideWidth / cols}px`,
                                height: `${pageSlideHeight / rows}px`,
                                margin: 'auto',
                            }}>
                            {renderCell(cell)}
                        </div>
                    ))}
                </div>
            );
            slides.push(slide);
        }
        const trackStyle = {
            width: `${pages * pageSlideWidth}px`,
            transform: `translate(${-pageSlideWidth * (activePageIndex - 1)}px, 0px)`,
            WebkitTransform: `translate(${-pageSlideWidth * (activePageIndex - 1)}px, 0px)`,
            // transitionDuration: '0.8s',
        };
        // when resizing event fires, cancel transitionDuration to an invisible speed
        if (resizing) {
            trackStyle.transitionDuration = 'initial';
        } else {
            trackStyle.transitionDuration = '0.8s';
        }
        return (
            <div className="page-list" style={{ maxHeight: pageSlideHeight }}>
                <div className="page-track" style={trackStyle}>
                    {slides}
                </div>
            </div>
        );
    }

    render() {
        if (this.props.dataSource.length === 0) {
            return null;
        }
        return (
            <div className="carousel-container" ref={(ref) => {
                this.container = ref;
            }}>
                <div
                    className="carousel"
                    style={{
                        maxWidth: this.state.pageSlideWidth,
                    }}>
                    {(this.state.activePageIndex !== 1) && this.renderPrevArrow()}
                    {this.renderPageList()}
                    {
                        (this.state.activePageIndex !== this.state.pages && this.state.pages > 0)
                        && this.renderNextArrow()
                    }
                </div>
                {this.renderPages()}
            </div>
        );
    }
}

export default withRouter(Carousel);
