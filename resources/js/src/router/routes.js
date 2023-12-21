import HomePage from "@/pages/HomePage.vue"
import PostsPage from "@/pages/PostsPage.vue"
import PostsDetail from "@/pages/PostDetail.vue"
import Timer from "@/pages/Timer.vue"
import LoginPage from "@/pages/LoginPage.vue"
import RegisterPage from "@/pages/RegisterPage.vue"
import Account from "@/pages/Account.vue"
import CreatePost from "@/pages/CreatePost.vue"
import UpdatePost from "@/pages/UpdatePost.vue"
import NotFound from "@/pages/NotFound.vue"

const routes = [  
  { path: '/', component: HomePage },
  { path: '/posts', component: PostsPage },
  { path: '/posts/:id', component: PostsDetail },
  { path: '/timer', component: Timer },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/account', component: Account },
  { path: '/create-post', component: CreatePost },
  { path: '/update-post/:id', component: UpdatePost },
  { path: '/404', component: NotFound },
]

export default routes