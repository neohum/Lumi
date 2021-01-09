import { default as reducer, initialState } from '../NotificationsReducer';
import {
    CLOSE_SNACKBAR,
    ENQUEUE_SNACKBAR,
    INotification,
    REMOVE_SNACKBAR
} from '../NotificationsTypes';

import {
    H5P_EXPORT_SUCCESS,
    H5P_EXPORT_ERROR,
    H5PEDITOR_EXPORTHTML_SUCCESS,
    H5PEDITOR_EXPORTHTML_ERROR
} from '../../H5PEditor/H5PEditorTypes';

describe('initialState', () => {
    it('returns the initial state', (done) => {
        const state = reducer(undefined, { type: 'init' } as any);

        expect(state).toEqual(initialState);
        done();
    });
});

describe('ENQUEUE_SNACKBAR', () => {
    it('adds a new notification to the notifications-list', (done) => {
        const notification: INotification = {
            key: 'a',
            message: 'test',
            options: {
                variant: 'warning'
            }
        };

        const state = reducer(
            {
                notifications: []
            } as any,
            {
                notification,
                type: ENQUEUE_SNACKBAR
            }
        );

        expect(state.notifications.length).toBe(1);
        done();
    });
});

describe('CLOSE_SNACKBAR', () => {
    it('dismisses a notification', (done) => {
        const notification: INotification = {
            key: 'a',
            message: 'test',
            options: {
                variant: 'warning'
            }
        };

        const state = reducer(
            {
                notifications: [notification]
            } as any,
            {
                dismissAll: false,
                key: 'a',
                type: CLOSE_SNACKBAR
            }
        );

        expect(state.notifications[0].dismissed).toBeTruthy();
        done();
    });
});

describe('REMOVE_SNACKBAR', () => {
    it('removes a notification from the notifications-list', (done) => {
        const notification: INotification = {
            key: 'a',
            message: 'test',
            options: {
                variant: 'warning'
            }
        };

        const state = reducer(
            {
                notifications: [notification]
            } as any,
            {
                key: 'a',
                type: REMOVE_SNACKBAR
            }
        );

        expect(state.notifications.length).toBe(0);
        done();
    });
});

describe('Notifications', () => {
    it('shows a success notification on H5P_EXPORT_SUCCESS', (done) => {
        const state = reducer(
            {
                notifications: []
            },
            {
                payload: {} as any,
                type: H5P_EXPORT_SUCCESS
            }
        );

        expect(state.notifications.length).toBe(1);
        expect(state.notifications[0].options.variant).toBe('success');
        done();
    });

    it('shows a error notification on H5P_EXPORT_ERROR', (done) => {
        const state = reducer(
            {
                notifications: []
            },
            {
                payload: {} as any,
                type: H5P_EXPORT_ERROR
            }
        );

        expect(state.notifications.length).toBe(1);
        expect(state.notifications[0].options.variant).toBe('error');
        done();
    });

    it('shows a success notification on H5PEDITOR_EXPORTHTML_SUCCESS', (done) => {
        const state = reducer(
            {
                notifications: []
            },
            {
                payload: {} as any,
                type: H5PEDITOR_EXPORTHTML_SUCCESS
            }
        );

        expect(state.notifications.length).toBe(1);
        expect(state.notifications[0].options.variant).toBe('success');
        done();
    });

    it('shows a error notification on H5PEDITOR_EXPORTHTML_ERROR', (done) => {
        const state = reducer(
            {
                notifications: []
            },
            {
                payload: {} as any,
                type: H5PEDITOR_EXPORTHTML_ERROR
            }
        );

        expect(state.notifications.length).toBe(1);
        expect(state.notifications[0].options.variant).toBe('error');
        done();
    });
});