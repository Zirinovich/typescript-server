import * as React from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

import {i18n} from "../../tools/i18n/i18n";
import '../../content/cuberportfolio/cuberportfolio.scss';

interface IProps {
    filters?: {
        name: string;
        value: string;
    }[];
    items?: {
        src: string;
        to?: string;
        title: string;
        text?: string;
        classes?: string[];
    }[]
}

interface IState {

}

export class CubePortfolio extends React.Component<IProps, IState> {
    static isLoaded = false;

    static loadJsClient() {
        if (!CubePortfolio.isLoaded) {
            require('./cubeportfolio/jquery.cubeportfolio.min.js');
            CubePortfolio.isLoaded = true;
        }
    }

    componentDidMount() {
        CubePortfolio.loadJsClient();

        var gridContainer = $('#grid-container'),
            filtersContainer = $('#filters-container');

        // init cubeportfolio
        gridContainer.cubeportfolio({
            defaultFilter: '*',
            animationType: 'flipOut',
            gapHorizontal: 45,
            gapVertical: 30,
            gridAdjustment: 'responsive',
            caption: 'overlayBottomReveal',
            displayType: 'lazyLoading',
            displayTypeSpeed: 100,
            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title',
            lightboxShowCounter: true,

            // singlePage popup
            singlePageDelegate: '.cbp-singlePage',
            singlePageDeeplinking: true,
            singlePageStickyNavigation: true,
            singlePageShowCounter: true,

            // single page inline
            singlePageInlineDelegate: '.cbp-singlePageInline',
            singlePageInlinePosition: 'above',
            singlePageInlineShowCounter: true,
            singlePageInlineInFocus: true,
            singlePageInlineCallback: function (url, element) {
                // to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
            }
        });

        // add listener for filters click
        filtersContainer.on('click', '.cbp-filter-item', function (e) {

            var me = $(this), wrap;
            // get cubeportfolio data and check if is still animating (reposition) the items.
            if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
                if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
                    wrap = $('.cbp-l-filters-dropdownWrap');
                    wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
                    wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
                    me.addClass('cbp-filter-item-active');
                } else {
                    me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
                }
            }

            // filter the items
            gridContainer.cubeportfolio('filter', me.data('filter'), function () {
            });

        });

        // activate counters
        gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));

    }

    render() {
        const {filters, items} = this.props;
        return (
            <div>
                <div id="filters-container" className="cbp-l-filters-alignCenter two">
                    <Button data-filter="*" className="cbp-filter-item-active cbp-filter-item">{i18n.t('_common.all')}</Button>
                    {
                        filters && filters.map((filter, index) => {
                            return (
                                <Button key={index}
                                        data-filter={'.' + filter.value}
                                        className="cbp-filter-item">{filter.name}</Button>
                            )
                        })
                    }
                </div>
                <div id="grid-container" className="cbp-l-grid-projects two">
                    <ul>
                        {
                            items && items.map((item, index) => {
                                let classes = ['cbp-item'];
                                classes = item.classes ? classes.concat(item.classes) : classes;
                                const className = classNames(classes);
                                return (
                                    <li key={index} className={className}>
                                        <div className="cbp-caption">
                                            <div className="cbp-caption-defaultWrap"><img
                                                src={item.src}
                                                alt=""/></div>
                                            <div className="cbp-caption-activeWrap">
                                                <div className="cbp-l-caption-alignCenter">
                                                    <div className="cbp-l-caption-body">
                                                        <Link to={item.to} className="cbp-l-caption-buttonLeft">{i18n.t('_common.moreInfo')}</Link>
                                                        <a href={item.src}
                                                           className="cbp-lightbox cbp-l-caption-buttonRight"
                                                           data-title={item.title + '<br/>' + item.text}>{i18n.t('_common.viewLarger')}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="threeborder">
                                            <div className="cbp-l-grid-projects-title two">{item.title}</div>
                                            <div className="cbp-l-grid-projects-desc">{item.text}</div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}