import { testState } from '../../core/store/state.tests.js';
import contained_views_by_id from '../contained_views_by_id';
import * as ActionTypes from '../../common/actions';
import { isContainedView, isSlide } from "../../common/utils";
import boxes_by_id from "../boxes_by_id";

const state = testState.present.containedViewsById;

describe('# contained_views_by_id reducer', ()=>{

    describe('DEFAULT', ()=>{
        test('Should return test.state as default', () => {
            expect(contained_views_by_id(state, {})).toEqual(state);
        });
    });
    describe('handle ADD_BOX', ()=>{
        test('If added box in a contained view (Slide)', () => {
            const action = {
                type: ActionTypes.ADD_BOX,
                payload: { ids:
                        { parent: 'cv-1524225239825', id: 'bo-1511443052929', container: 0 },
                draggable: true,
                resizable: true,
                content: '',
                toolbar: {},
                config: {},
                state: {},
                initialParams: {},
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            newState['cv-1524225239825'].boxes = ["bs-1524225239825", 'bo-1511443052929'];

            expect(isContainedView(action.payload.ids.parent)).toBeTruthy();
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });

    });

    describe('handle EDIT_RICH_MARK', () => {
        test.skip('If rich mark edited and old/new links are not contained views', () => {

            const action = {
                type: ActionTypes.EDIT_RICH_MARK,
                payload: {
                    "mark": {
                        "id": "rm-1524225239825",
                        "origin": "bo-1524225237703",
                        "title": "Nueva marca 3",
                        "connection": "http://vishub.org",
                        "color": "#222222",
                        "connectMode": "external",
                        "displayMode": "navigate",
                        "value": "50,50",
                    },
                    "view": {
                    },
                    "viewToolbar": {
                    },
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            newState["cv-1524225239825"].parent = {};
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
        test.skip('If rich mark edited and old link is a contained view', () => {
            const action = {
                type: ActionTypes.EDIT_RICH_MARK,
                payload: {
                    "mark": {
                        "id": "rm-1524225239825",
                        "origin": "bo-1524225237703",
                        "title": "Nueva marca 3",
                        "connection": "cv-1524481518690",
                        "color": "#222222",
                        "connectMode": "new",
                        "displayMode": "navigate",
                        "value": "50,50",
                    },
                    "view": {
                        "info": "new",
                        "type": "document",
                        "id": "cv-1524481518690",
                        "parent": {
                            "rm-1524225239825": "bo-1524225237703",
                        },
                        "boxes": [
                            "bs-1524481518690",
                        ],
                        "extraFiles": {},
                    },
                    "viewToolbar": {
                        "id": "cv-1524481518690",
                        "doc_type": "document",
                        "viewName": "Vista Contenida 3",
                    },
                },
            };
            let newState = JSON.parse(JSON.stringify(state));
            console.log(state);
            newState["cv-1524225239825"] = {
                "info": "new",
                "type": "document",
                "id": "cv-1524225239825",
                "parent": {
                },
                "boxes": [
                    "bs-1524225239825",
                ],
                "extraFiles": {},
            };

            newState["cv-1524481518690"] = {
                "boxes": ["bs-1524481518690"],
                extraFiles: {},
                id: "cv-1524481518690",
                info: "new",
                parent: { "rm-1524225239825": "bo-1524225237703" },
                type: "document",
            };

            expect(contained_views_by_id(state, action)).toEqual(newState);
        });

        test('If rich mark edited and new link is a contained view', () => {
            const action = {
                type: ActionTypes.EDIT_RICH_MARK,
                payload: {
                    "mark": {
                        "id": "rm-1524225239825",
                        "origin": "bo-1524225237703",
                        "title": "Nueva marca 3",
                        "connection": "cv-1524481518690",
                        "color": "#222222",
                        "connectMode": "new",
                        "displayMode": "navigate",
                        "value": "50,50",
                    },
                    "view": {
                        "info": "new",
                        "type": "document",
                        "id": "cv-1524481518690",
                        "parent": {
                            "rm-1524225239825": "bo-1524225237703",
                        },
                        "boxes": [
                            "bs-1524481518690",
                        ],
                        "extraFiles": {},
                    },
                    "viewToolbar": {
                        "id": "cv-1524481518690",
                        "doc_type": "document",
                        "viewName": "Vista Contenida 3",
                    },
                },
            };
            let newState = JSON.parse(JSON.stringify(state));
            console.log(state);
            newState["cv-1524225239825"] = {
                "info": "new",
                "type": "document",
                "id": "cv-1524225239825",
                "parent": {
                },
                "boxes": [
                    "bs-1524225239825",
                ],
                "extraFiles": {},
            };

            newState["cv-1524481518690"] = {
                "boxes": ["bs-1524481518690"],
                extraFiles: {},
                id: "cv-1524481518690",
                info: "new",
                parent: { "rm-1524225239825": "bo-1524225237703" },
                type: "document",
            };

            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle DELETE_RICH_MARK', () => {
        test('If rich mark deleted', () => {
            const action = {
                type: ActionTypes.DELETE_RICH_MARK,
                payload: {
                    mark: {
                        "id": "rm-1524225239825",
                        "origin": "bo-1524225237703",
                        "title": "Nueva marca 3",
                        "connection": "cv-1524225239825",
                        "color": "#222222",
                        "connectMode": "new",
                        "displayMode": "navigate",
                        "value": "50,50",
                    },
                },
            };
            let newState = JSON.parse(JSON.stringify(state));
            newState["cv-1524225239825"].parent = {};

            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle ADD_RICH_MARK', () => {

        test('If rich mark added to an existing contained view', () => {

            const action = {
                type: ActionTypes.ADD_RICH_MARK,
                payload: {
                    mark: {
                        id: "rm-1511786135103",
                        title: "new mark",
                        connectMode: "existing",
                        "origin": "bo-1511786135103",
                        connection: "cv-1524225239825",
                        displayMode: "navigate",
                        value: "30.95,49.15",
                        color: "#222222",
                    },
                    state: {},
                },
            };

            const newState = JSON.parse(JSON.stringify(state));

            newState["cv-1524225239825"].parent["rm-1511786135103"] = 'bo-1511786135103';

            expect(action.payload.mark.connectMode === 'existing').toBeTruthy();
            expect(isContainedView(action.payload.mark.connection)).toBeTruthy();

            expect(contained_views_by_id(state, action)).toEqual(newState);
        });

        test('If rich mark added to a new contained view', () => {
            const action = {
                type: ActionTypes.ADD_RICH_MARK,
                payload: {
                    "mark": {
                        "id": "rm-1524225239825",
                        "origin": "bo-1524225237703",
                        "title": "Nueva marca 3",
                        "connection": "cv-1524481518690",
                        "color": "#222222",
                        "connectMode": "new",
                        "displayMode": "navigate",
                        "value": "50,50",
                    },
                    "view": {
                        "info": "new",
                        "type": "document",
                        "id": "cv-1524481518690",
                        "parent": {
                            "rm-1524225239825": "bo-1524225237703",
                        },
                        "boxes": [
                            "bs-1524481518690",
                        ],
                        "extraFiles": {},
                    },
                    "viewToolbar": {
                        "id": "cv-1524481518690",
                        "doc_type": "document",
                        "viewName": "Vista Contenida 3",
                    },
                },
            };
            const newState = JSON.parse(JSON.stringify(state));

            newState[action.payload.view.id] = action.payload.view;
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle DELETE_BOX', () => {
        test('If deleted box is linked to a contained view', () => {
            const action = {
                type: ActionTypes.DELETE_BOX,
                payload: {
                    id: 'bo-1524225237703',
                    parent: "bs-1497983247797",
                    container: 0,
                    children: [],
                    cvs: ["cv-1511252975055"],
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });

        test('If the deleted box(s) parent is a contained view', () => {
            const action = {
                type: ActionTypes.DELETE_BOX,
                payload: {
                    id: "bs-1524225239825",
                    parent: 'cv-1511252975055',
                    container: 0,
                    children: [],
                    cvs: [],
                },
            };
            const newState = JSON.parse(JSON.stringify(state));

            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle CHANGE_CONTAINED_VIEW_NAME', () => {
        test('If contained view name changed', () => {
            const action = {
                type: ActionTypes.CHANGE_CONTAINED_VIEW_NAME,
                payload: {
                    id: 'cv-1511252975055',
                    title: 'vc2',
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            newState[action.payload.id].name = action.payload.title;
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle DELETE_CONTAINED_VIEW', () => {
        test('If contained view deleted', () => {
            const action = {
                type: ActionTypes.DELETE_CONTAINED_VIEW,
                payload: {
                    ids: ["cv-1511252975055"],
                    boxes: ['bo-1511443052968'],
                    parent: {},
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            delete newState["cv-1511252975055"];
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle DELETE_NAV_ITEM', () => {
        test('If nav item deleted and has a linked contained view', () => {
            const action = {
                type: ActionTypes.DELETE_NAV_ITEM,
                payload: {
                    ids: ['pa-1511252955865'],
                    parent: 'se-1511252954307',
                    boxes: ['bo-1511252970033'],
                    containedViews: {},
                    linkedBoxes: {},
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            delete newState["cv-1524225239825"].parent[action.payload.boxes[0]];
            // delete newState["cv-1511252975058"].parent[action.payload.boxes[0]];
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle DELETE_SORTABLE_CONTAINER', () => {
        test('If sortable container deleted has a box linked to a contained view', () => {
            const action = {
                type: ActionTypes.DELETE_NAV_ITEM,
                payload: {
                    id: 'sc-1511443052922',
                    parent: 'bs-1511252985426',
                    children: ["bo-1511443052925", "bo-1511443052967"],
                    cvs: { 'cv-1524225239825': ["bo-1511443052925"] },
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            delete newState['cv-1524225239825'].parent[action.payload.cvs[0]];
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });

    describe('handle IMPORT_STATE', () => {
        test('If state imported', () => {
            const action = {
                type: ActionTypes.IMPORT_STATE,
                payload: {
                    present: {},
                },
            };
            expect(boxes_by_id(state, action)).toEqual(state);
        });
    });

    describe('handle PASTE_BOX', () => {
        test('If box pasted to cv slide', () => {

            let ids = {
                "id": "bo-1524225237703",
                "parent": "cv-1524225239825",
                "container": 0,

            };
            const action = {
                type: ActionTypes.PASTE_BOX,
                payload: {
                    ids: ids,
                    box: {},
                    toolbar: {},
                },

            };

            const newState = JSON.parse(JSON.stringify(state));
            newState["cv-1524225239825"].boxes = ["bs-1524225239825", ids.id];
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
        test('If box pasted to regular view', () => {

            let ids = {
                "id": "bo-1511868565135",
                "parent": "bs-1497983247797",
                "container": "sc-1511868565133",

            };
            const action = {
                type: ActionTypes.PASTE_BOX,
                payload: {
                    ids: ids,
                    box: {},
                    toolbar: {},
                },

            };

            expect(contained_views_by_id(state, action)).toEqual(state);
        });
    });

    describe('handle CHANGE_BOX_LAYER', () => {
        test('Bring to front selected_box in a slide', () => {
            const action = {
                type: ActionTypes.CHANGE_BOX_LAYER,
                payload: {
                    id: 'bo-1511443052968',
                    parent: "cv-1524225239825",
                    container: 0,
                    value: 'front',
                    boxes_array: ['bo-1511443052968', 'bo-1511443052969'],
                },
            };
            const newState = JSON.parse(JSON.stringify(state));
            newState['cv-1524225239825'].boxes = ['bo-1511443052969', 'bo-1511443052968'];
            expect(contained_views_by_id(state, action)).toEqual(newState);
        });
    });
});

