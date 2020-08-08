import Vue from 'vue'
import Vuex, { ActionContext, GetterTree } from 'vuex'
import { fetchGet, fetchPost, fetchDelete } from '@/fetch'

Vue.use(Vuex)

interface Paginate {
  size: number;
  page: number;
}

interface AuthenticateInput {
  username: string;
  password: string;
}

interface PublishPostInput {
  title: string;
  content: string;
  tags: Array<string>;
}

interface FetchTopicListInput {
  tag?: string;
  size?: number;
  page: number;
}

interface TopicListPage {
  [index: number]: Record<string, any>;
}

interface FetchCommentListInput {
  size: number;
  page: number;
  topicId: number;
}

interface CommentListPage {
  [index: number]: Record<string, any>;
}

interface PublishCommentInput {
  topicId: number;
  replyTo: number;
  content: string;
}

interface State {
  VUE_APP_NAME: string;
  VUE_APP_HCAPTCHA_SITEKEY: string;
  token: string;
  profile?: Record<string, any>;
  topics: Array<TopicListPage>;
  topicIndex: number;
  pageSize: number;
  loading: boolean;
  comments: Array<CommentListPage>;
  commentIndex: number;
}

export default new Vuex.Store({
  state: {
    VUE_APP_NAME: process.env.VUE_APP_NAME,
    VUE_APP_HCAPTCHA_SITEKEY: process.env.VUE_APP_HCAPTCHA_SITEKEY,
    token: localStorage.getItem('__token') || '',
    profile: undefined,
    topics: [],
    topicIndex: 0,
    pageSize: 20,
    loading: false,
    comments: [],
    commentIndex: 0
  } as State,
  getters: {
    isLoggedIn(state: State): boolean {
      return state.token.length > 0
    },
    authToken(state: State): string {
      return state.token
    },
    paginatedTopicList(state: State): TopicListPage {
      if (state.topics.length > state.topicIndex) {
        return state.topics[state.topicIndex]
      }
      return []
    },
    paginatedCommentList(state: State): CommentListPage {
      if (state.comments.length > state.commentIndex) {
        return state.comments[state.commentIndex]
      }
      return []
    },
    roles(state: State): Array<string> {
      return state.profile && state.profile.RoleList ? state.profile.RoleList.concat(state.profile.ID) : []
    }
  } as GetterTree<State, State>,
  mutations: {
    SET_TOKEN(state: State, token?: string) {
      state.token = token ? 'Bearer ' + token : ''
      localStorage.setItem('__token', state.token)
    },
    SET_PROFILE(state: State, profile?: any) {
      state.profile = profile
    },
    RESET_TOPIC_DATA(state: State, topics: TopicListPage) {
      state.topics = [topics]
    },
    APPEND_TOPIC_PAGE(state: State, topics: TopicListPage) {
      state.topics.push(topics)
    },
    SET_LOADING_STATE(state: State, status: boolean) {
      state.loading = status
    },
    APPEND_COMMENT_PAGE(state: State, comments: CommentListPage) {
      state.comments.push(comments)
    }
  },
  actions: {
    async Register(store: ActionContext<State, State>, input: AuthenticateInput) {
      const data = await fetchPost('/users', undefined, input)
      store.commit('SET_TOKEN', data.Token)
      store.commit('SET_PROFILE', data.User)
    },
    async Login(store: ActionContext<State, State>, input: AuthenticateInput) {
      const data = await fetchPost('/tokens', undefined, input)
      store.commit('SET_TOKEN', data.Token)
      store.commit('SET_PROFILE', data.User)
    },
    async Publish(store: ActionContext<State, State>, input: PublishPostInput) {
      if (input.tags.length === 0) {
        throw '添加个标签吧'
      }
      if (input.title.length < 3) {
        throw '标题连三个字都不到'
      }
      if (input.content.length < 4) {
        throw '正文连四个字都不到'
      }
      return await fetchPost('/topics', undefined, input)
    },
    async FetchTopicPage(store: ActionContext<State, State>, input: FetchTopicListInput) {
      const q = new URLSearchParams
      q.set('s', String(input.size))
      q.set('p', String(input.page))
      if (input.tag) {
        q.set('t', input.tag.trim())
      }

      return await fetchGet('/topics', q)
    },
    async FetchUserProfile(store: ActionContext<State, State>) {
      const data = await fetchGet('/status')
      store.commit('SET_PROFILE', data)
    },
    async FetchTopic(store: ActionContext<State, State>, topicId: number) {
      return await fetchGet(`/topics/${topicId}`)
    },
    async FetchCommentPage(store: ActionContext<State, State>, input: FetchCommentListInput) {
      const q = new URLSearchParams()
      q.set('tid', String(input.topicId))
      q.set('p', String(input.page))
      q.set('s', String(input.size))

      return await fetchGet(`/comments`, q)
    },
    async PublishComment(store: ActionContext<State, State>, input: PublishPostInput) {
      return await fetchPost('/comments', undefined, input)
    },
    async Logout(store: ActionContext<State, State>) {
      store.commit('SET_TOKEN', '')
      store.commit('SET_PROFILE', undefined)
    },
    async FetchUserDetail(store: ActionContext<State, State>, name: string) {
      return await fetchGet(`/users/${name}`)
    },
    async FetchNotification(store: ActionContext<State, State>, input: Paginate) {
      const q = new URLSearchParams()
      q.set('p', String(input.page))
      q.set('s', String(input.size))

      return await fetchGet('/notifications', q)
    },
    async MarkNotificationRead(store: ActionContext<State, State>, notifyId: number) {
      return await fetchDelete(`/notifications/${notifyId}`)
    }
  },
  modules: {
  }
})
