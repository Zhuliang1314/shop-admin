import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

// @ts-ignore
import Admin from "~/layouts/admin.vue";
// @ts-ignore
import Index from '~/pages/index.vue'
// @ts-ignore
import Login from '~/pages/login.vue'
// @ts-ignore
import NotFound from '~/pages/404.vue'
// @ts-ignore
import GoodList from '~/pages/goods/list.vue'
// @ts-ignore
import CategoryList from '~/pages/category/list.vue'
// @ts-ignore
import UserList from '~/pages/user/list.vue'
// @ts-ignore
import OrderList from '~/pages/order/list.vue'
// @ts-ignore
import CommentList from '~/pages/comment/list.vue'
// @ts-ignore
import ImageList from '~/pages/image/list.vue'
// @ts-ignore
import NoticeList from '~/pages/notice/list.vue'
// @ts-ignore
import SettingBase from '~/pages/setting/base.vue'
// @ts-ignore
import CouponList from '~/pages/coupon/list.vue'
// @ts-ignore
import ManagerList from '~/pages/manager/list.vue'
// @ts-ignore
import AccessList from '~/pages/access/list.vue'
// @ts-ignore
import RoleList from '~/pages/role/list.vue'
// @ts-ignore
import SkusList from '~/pages/skus/list.vue'
// @ts-ignore
import LevelList from '~/pages/level/list.vue'
// @ts-ignore
import SettingBuy from '~/pages/setting/buy.vue'
// @ts-ignore
import SettingShip from '~/pages/setting/ship.vue'
// @ts-ignore
import DistributionIndex from '~/pages/distribution/index.vue'
// @ts-ignore
import DistributionSetting from '~/pages/distribution/setting.vue'
// @ts-ignore
import NewDraf from '~/pages/newdraf/newpage.vue'


// 默认路由，所有用户共享
const routes = [
    {
        path: "/",
        name: "admin",
        component: Admin,
    },
    {
        path: "/newdraf",
        component: NewDraf,
        meta: {
            title: "草稿"
        }
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: "登录页"
        }
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }]


// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [{
    path: "/",
    name: "/",
    component: Index,
    meta: {
        title: "后台首页"
    }
}, {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodList,
    meta: {
        title: "商品管理"
    }
}, {
    path: "/category/list",
    name: "/category/list",
    component: CategoryList,
    meta: {
        title: "分类列表"
    }
}, {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
        title: "用户列表"
    }
}, {
    path: "/order/list",
    name: "/order/list",
    component: OrderList,
    meta: {
        title: "订单列表"
    }
}, {
    path: "/comment/list",
    name: "/comment/list",
    component: CommentList,
    meta: {
        title: "评价列表"
    }
}, {
    path: "/image/list",
    name: "/image/list",
    component: ImageList,
    meta: {
        title: "图库列表"
    }
}, {
    path: "/notice/list",
    name: "/notice/list",
    component: NoticeList,
    meta: {
        title: "公告列表"
    }
}, {
    path: "/setting/base",
    name: "/setting/base",
    component: SettingBase,
    meta: {
        title: "配置"
    }
}, {
    path: "/coupon/list",
    name: "/coupon/list",
    component: CouponList,
    meta: {
        title: "优惠券列表"
    }
}, {
    path: "/manager/list",
    name: "/manager/list",
    component: ManagerList,
    meta: {
        title: "管理员管理"
    }
}, {
    path: "/access/list",
    name: "/access/list",
    component: AccessList,
    meta: {
        title: "菜单权限管理"
    }
}, {
    path: "/role/list",
    name: "/role/list",
    component: RoleList,
    meta: {
        title: "角色管理"
    }
}, {
    path: "/skus/list",
    name: "/skus/list",
    component: SkusList,
    meta: {
        title: "规格管理"
    }
}, {
    path: "/level/list",
    name: "/level/list",
    component: LevelList,
    meta: {
        title: "会员等级"
    }
}, {
    path: "/setting/buy",
    name: "/setting/buy",
    component: SettingBuy,
    meta: {
        title: "支付设置"
    }
}, {
    path: "/setting/ship",
    name: "/setting/ship",
    component: SettingShip,
    meta: {
        title: "物流设置"
    }
}, {
    path: "/distribution/index",
    name: "/distribution/index",
    component: DistributionIndex,
    meta: {
        title: "分销员管理"
    }
}, {
    path: "/distribution/setting",
    name: "/distribution/setting",
    component: DistributionSetting,
    meta: {
        title: "分销设置"
    }
}]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute("admin", item)
                hasNewRoutes = true
            }
            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}