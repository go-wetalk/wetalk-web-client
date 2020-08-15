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

    const resp = await fetch(`${process.env.VUE_APP_ENDPOINT}${route}${query ? '?' + query.toString() : ''}`, {
        method,
        headers: h,
        body: body ? JSON.stringify(body) : body
    })

    if (resp.status !== 200) {
        store.commit('SET_LOADING_STATE', false)
        throw '网络连接异常'
    }

    const data = await resp.json()

    if (data.Code === 401) {
        store.commit('SET_TOKEN', '')
        store.commit('SET_PROFILE', undefined)
    }

    if (data.Code !== 0) {
        store.commit('SET_LOADING_STATE', false)
        throw data.Message
    }

    store.commit('SET_LOADING_STATE', false)
    return await data.Data
}

export async function fetchGet(route: string, query?: URLSearchParams) {
    return await _fetch(route, methods.GET, query)
}

export async function fetchPost(route: string, query?: URLSearchParams, body?: Record<string, any>) {
    return await _fetch(route, methods.POST, query, body)
}

export async function fetchDelete(route: string) {
    return await _fetch(route, methods.DELETE)
}

export async function fetchPut(route: string, body: Record<string, any>, query?: URLSearchParams) {
    return await _fetch(route, methods.PUT, query, body)
}

export async function fetchPutWithFile(route: string, name: string, f: File, query?: URLSearchParams) {
    store.commit('SET_LOADING_STATE', true)

    const h = new Headers()
    if (store.getters.isLoggedIn) {
        h.set('Authorization', store.getters.authToken)
    }

    const d = new FormData
    d.set(name, f)

    const resp = await fetch(`${process.env.VUE_APP_ENDPOINT}${route}${query ? '?' + query.toString() : ''}`, {
        method: 'PUT',
        headers: h,
        body: d
    })

    if (resp.status !== 200) {
        store.commit('SET_LOADING_STATE', false)
        throw '网络连接异常'
    }

    const data = await resp.json()

    if (data.Code === 401) {
        store.commit('SET_TOKEN', '')
        store.commit('SET_PROFILE', undefined)
    }

    if (data.Code !== 0) {
        throw data.Message
    }

    store.commit('SET_LOADING_STATE', false)
    return await data.Data
}