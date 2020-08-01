import store from './store'

export enum methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 *
 * @param route 接口
 * @param method 方法
 * @param query 查询参数
 * @param body 请求体
 */
export default async function _fetch(route: string, method: methods, query?: URLSearchParams, body?: Record<string, any>) {
    store.commit('SET_LOADING_STATE', true)

    const h = new Headers()
    h.set('Content-Type', 'application/json')
    if (store.getters.isLoggedIn) {
        h.set('Authorization', store.getters.authToken)
    }

    const resp = await fetch(`${process.env.VUE_APP_ENDPOINT}${route}?${query ? query.toString() : ''}`, {
        method,
        headers: h,
        body: body ? JSON.stringify(body) : undefined
    })

    if (resp.status !== 200) {
        store.commit('SET_LOADING_STATE', false)
    }

    if (resp.status === 400) {
        throw Object.values(await resp.json())[0]
    }

    if (resp.status === 401) {
        store.commit('SET_TOKEN', '')
        store.commit('SET_PROFILE', undefined)
        throw '登录状态已失效'
    }

    if (resp.status !== 200) {
        throw (await resp.json()).Message
    }

    store.commit('SET_LOADING_STATE', false)
    return await resp.json()
}

export async function fetchGet(route: string, query?: URLSearchParams) {
    return await _fetch(route, methods.GET, query)
}

export async function fetchPost(route: string, query?: URLSearchParams, body?: Record<string, any>) {
    return await _fetch(route, methods.POST, query, body)
}