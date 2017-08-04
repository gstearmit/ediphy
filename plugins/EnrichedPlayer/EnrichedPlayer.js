import React from "react";
import EnrichedPlayerPlugin from './components/EnrichedPlayerPluginEditor.js';
import i18n from 'i18next';
require('./EnrichedPlayer.scss');

export function EnrichedPlayer(base) {
    return {
        getConfig: function() {
            return {
                name: "EnrichedPlayer",
                flavor: "react",
                isRich: true,
                displayName: Dali.i18n.t("EnrichedPlayer.PluginName"),
                category: "multimedia",
                initialWidth: '30%',
                icon: "play_arrow",
                marksType: [{ name: i18n.t("EnrichedPlayer.pos"), key: 'value', format: '[x%]', default: '50%' }],
            };
        },
        getToolbar: function() {
            return {
                main: {
                    __name: "Main",
                    accordions: {
                        basic: {
                            __name: Dali.i18n.t('EnrichedPlayer.Video'),
                            icon: 'link',
                            buttons: {
                                url: {
                                    __name: Dali.i18n.t('EnrichedPlayer.URL'),
                                    type: 'text',
                                    value: base.getState().url,
                                    autoManaged: false,
                                },
                                controls: {
                                    __name: Dali.i18n.t('EnrichedPlayer.Show_controls'),
                                    type: 'checkbox',
                                    checked: base.getState().controls,
                                    autoManaged: false,
                                },
                            },
                        },
                        style: {
                            __name: Dali.i18n.t('EnrichedPlayer.box_style'),
                            icon: 'palette',
                            buttons: {
                                padding: {
                                    __name: Dali.i18n.t('EnrichedPlayer.padding'),
                                    type: 'number',
                                    value: 0,
                                    min: 0,
                                    max: 100,
                                },
                                borderWidth: {
                                    __name: Dali.i18n.t('EnrichedPlayer.border_size'),
                                    type: 'number',
                                    value: 0,
                                    min: 0,
                                    max: 10,
                                },
                                borderStyle: {
                                    __name: Dali.i18n.t('EnrichedPlayer.border_style'),
                                    type: 'select',
                                    value: 'solid',
                                    options: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'],
                                },
                                borderColor: {
                                    __name: Dali.i18n.t('EnrichedPlayer.border_color'),
                                    type: 'color',
                                    value: '#000000',
                                },
                                borderRadius: {
                                    __name: Dali.i18n.t('EnrichedPlayer.radius'),
                                    type: 'number',
                                    value: 0,
                                    min: 0,
                                    max: 50,
                                },
                                opacity: {
                                    __name: Dali.i18n.t('EnrichedPlayer.opacity'),
                                    type: 'range',
                                    value: 1,
                                    min: 0,
                                    max: 1,
                                    step: 0.05,
                                },

                            },
                        },
                    },
                },
            };
        },
        getInitialState: function() {
            return {
                url: "https://www.youtube.com/watch?v=vTIIMJ9tUc8",
                controls: true,
            };
        },
        getRenderTemplate: function(state) {

            return (
                /* jshint ignore:start */
                <div style={{ width: "100%", height: "100%" }}>
                    <EnrichedPlayerPlugin style={{ width: "100%", height: "100%" }} state={state} base={base} />
                </div>
                /* jshint ignore:end */
            );
        },
        parseRichMarkInput: function(...value) {
            let parsed_value = (value[0] + 10) * 100 / value[2];
            return parsed_value.toFixed(2) + "%";
        },
        handleToolbar: function(name, value) {
            base.setState(name, value);
        },
        validateValueInput: function(value) {
            let regex = /(^\d+(?:\.\d*)?%$)/g;
            let match = regex.exec(value);
            if (match && match.length === 2) {
                let val = Math.round(parseFloat(match[1]) * 100) / 100;
                if (isNaN(val) || val > 100) {
                    return { isWrong: true, message: i18n.t("EnrichedPlayer.message_mark_percentage") };
                }
                value = val + '%';
            } else {
                return { isWrong: true, message: i18n.t("EnrichedPlayer.message_mark_percentage") };
            }
            return { isWrong: false, value: value };

        },

    };
}