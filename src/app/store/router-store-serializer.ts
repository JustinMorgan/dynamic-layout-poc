import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { get } from 'lodash';
import { IRouterState } from './reducers';

/**
 * just get important properties from routerstate to save memory and performance in store
 */
export class CustomSerializer implements RouterStateSerializer<IRouterState> {
    serialize(routerState: RouterStateSnapshot): IRouterState {
        const { url } = routerState;
        const { queryParams }: Params = routerState.root;
        let state: ActivatedRouteSnapshot = routerState.root;

        const path: string = get(state, 'firstChild.routeConfig.path', '');

        while (state.firstChild) {
            state = state.firstChild;
        }

        const { params } = state;

        return { url, queryParams, params, path };
    }
}
