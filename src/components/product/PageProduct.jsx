import React from 'react'
import { Container } from 'react-bootstrap'

const PageProduct = () => {
    return (
        <div className="widget-area secondary" id="secondary" itemType="https://schema.org/WPSideBar" itemScope="itemscope">
          <div className="sidebar-main">
            <div className="ast-filter-wrap">
              <div id="block-13" className="ast-woo-sidebar-widget widget widget_block widget_search">
                <form role="search" method="get" action="https://tuivaicanvenient.com/" className="wp-block-search__button-outside wp-block-search__icon-button wp-block-search">
                  <label className="wp-block-search__label screen-reader-text" htmlFor="wp-block-search__input-1">Search</label>
                  <div className="wp-block-search__inside-wrapper">
                    <input 
                      className="wp-block-search__input" 
                      id="wp-block-search__input-1" 
                      placeholder="Tìm sản phẩm.." 
                      value="" 
                      type="search" 
                      name="s" 
                      required 
                    />
                    <input type="hidden" name="post_type" value="product" />
                    <button aria-label="Search" className="wp-block-search__button has-icon wp-element-button" type="submit">
                      <svg className="search-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
    
              <div id="block-14" className="ast-woo-sidebar-widget widget widget_block">
                <div data-block-name="woocommerce/filter-wrapper" data-filter-type="price-filter" data-heading="Filter by price" className="wp-block-woocommerce-filter-wrapper">
                  <div className="wc-blocks-filter-wrapper">
                    <h3 className="wp-block-heading">Lọc theo</h3>
                    <div className="wp-block-woocommerce-price-filter">
                      <div className="wc-block-price-slider">
                        <div className="wc-block-price-filter wc-block-components-price-slider wc-block-price-filter--has-input-fields wc-block-components-price-slider--has-input-fields wc-block-components-price-slider--is-input-inline">
                          <div className="wc-block-price-filter__range-input-wrapper wc-block-components-price-slider__range-input-wrapper">
                            <div aria-hidden="true">
                              <div 
                                className="wc-block-price-filter__range-input-progress wc-block-components-price-slider__range-input-progress" 
                                style={{ '--low': '0%', '--high': '100%' }}
                              ></div>
                              <input 
                                type="range" 
                                className="wc-block-price-filter__range-input wc-block-price-filter__range-input--min wc-block-components-price-slider__range-input" 
                                aria-label="Lọc sản phẩm theo giá tối thiểu" 
                                aria-valuetext="69000" 
                                step="1" 
                                min="69000" 
                                max="79000" 
                                tabIndex="-1" 
                                value="69000" 
                              />
                              <input 
                                type="range" 
                                className="wc-block-price-filter__range-input wc-block-price-filter__range-input--max wc-block-components-price-slider__range-input" 
                                aria-label="Lọc sản phẩm theo giá tối đa" 
                                aria-valuetext="79000" 
                                step="1" 
                                min="69000" 
                                max="79000" 
                                tabIndex="-1" 
                                value="79000" 
                              />
                            </div>
                          </div>
                          <div className="wc-block-price-filter__controls wc-block-components-price-slider__controls">
                            <input 
                              className="wc-block-formatted-money-amount wc-block-components-formatted-money-amount wc-block-price-filter__amount wc-block-price-filter__amount--min" 
                              aria-label="Lọc sản phẩm theo giá tối thiểu" 
                              type="text" 
                              value="69.000 ₫" 
                              inputMode="numeric" 
                            />
                            <input 
                              className="wc-block-formatted-money-amount wc-block-components-formatted-money-amount wc-block-price-filter__amount wc-block-price-filter__amount--max" 
                              aria-label="Lọc sản phẩm theo giá tối đa" 
                              type="text" 
                              value="79.000 ₫" 
                              inputMode="numeric" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              <div id="block-15" className="ast-woo-sidebar-widget widget widget_block">
                <div className="wp-block-group has-ast-global-color-0-color has-text-color is-layout-constrained wp-container-core-group-is-layout-1 wp-block-group-is-layout-constrained" style={{ paddingTop: '0px', paddingRight: '0px', paddingBottom: '20px', paddingLeft: '0px' }}>
                  <div className="wp-block-group__inner-container">
                    <h2 className="wp-block-heading has-ast-global-color-2-color has-text-color" style={{ fontSize: '1.2em' }}>Danh mục</h2>
                    <div data-block-name="woocommerce/product-categories" className="wp-block-woocommerce-product-categories wc-block-product-categories wp-elements-6cfc94774cd31a0945252ec8b477d717 is-list has-text-color has-ast-global-color-0-color">
                      <ul className="wc-block-product-categories-list wc-block-product-categories-list--depth-0">
                        <li className="wc-block-product-categories-list-item">
                          <a href="https://tuivaicanvenient.com/danh-muc-san-pham/tat-ca-san-pham/">
                            <span className="wc-block-product-categories-list-item__name">TẤT CẢ SẢN PHẨM</span>
                          </a>
                          <span className="wc-block-product-categories-list-item-count">
                            <span aria-hidden="true">12</span><span className="screen-reader-text">12 sản phẩm</span>
                          </span>
                        </li>
                        <li className="wc-block-product-categories-list-item">
                          <a href="https://tuivaicanvenient.com/danh-muc-san-pham/tui-ban-chay/">
                            <span className="wc-block-product-categories-list-item__name">TÚI BÁN CHẠY</span>
                          </a>
                          <span className="wc-block-product-categories-list-item-count">
                            <span aria-hidden="true">7</span><span className="screen-reader-text">7 sản phẩm</span>
                          </span>
                        </li>
                        <li className="wc-block-product-categories-list-item">
                          <a href="https://tuivaicanvenient.com/danh-muc-san-pham/tui-du-lich/">
                            <span className="wc-block-product-categories-list-item__name">TÚI DU LỊCH</span>
                          </a>
                          <span className="wc-block-product-categories-list-item-count">
                            <span aria-hidden="true">22</span><span className="screen-reader-text">22 sản phẩm</span>
                          </span>
                        </li>
                        <li className="wc-block-product-categories-list-item">
                          <a href="https://tuivaicanvenient.com/danh-muc-san-pham/tui-moi-ra-mat/">
                            <span className="wc-block-product-categories-list-item__name">TÚI MỚI RA MẮT</span>
                          </a>
                          <span className="wc-block-product-categories-list-item-count">
                            <span aria-hidden="true">10</span><span className="screen-reader-text">10 sản phẩm</span>
                          </span>
                        </li>
                        <li className="wc-block-product-categories-list-item">
                          <a href="https://tuivaicanvenient.com/danh-muc-san-pham/tui-ngay-le/">
                            <span className="wc-block-product-categories-list-item__name">TÚI NGÀY LỄ</span>
                          </a>
                          <span className="wc-block-product-categories-list-item-count">
                            <span aria-hidden="true">5</span><span className="screen-reader-text">5 sản phẩm</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      );
    };
    

export default PageProduct