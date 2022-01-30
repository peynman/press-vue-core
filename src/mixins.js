import * as CartDetails from './mixins/CartDetails'
import * as ChartSettings from './mixins/ChartSettings'
import * as ChatRoom from './mixins/ChatRoom'
import * as CrudRoute from './mixins/CrudRoute'
import * as CrudTable from './mixins/CrudTable'
import * as Decoratable from './mixins/Decoratable'
import * as FormValidations from './mixins/FormValidations'
import * as Iran from './mixins/Iran'
import * as PaasApp from './mixins/PaasApp'
import * as Product from './mixins/Product'
import * as ProductCategories from './mixins/ProductCategories'
import * as ProductList from './mixins/ProductList'
import * as ProductReviews from './mixins/ProductReviews'
import * as ResponseAlerts from './mixins/ResponseAlerts'
import * as Search from './mixins/Search'
import * as Themeable from './mixins/Themeable'
import * as TimestampFormatter from './mixins/TimestampFormatter'
import * as User from './mixins/User'
import * as UserCartDetails from './mixins/UserCartDetails'
import * as UserNotifications from './mixins/UserNotifications'
import * as UserProfile from './mixins/UserProfile'
import * as UserProfileMethods from './mixins/UserProfileMethods'
import * as UserPurchasingCart from './mixins/UserPurchasingCart'
import * as WidgetsRenderer from './mixins/WidgetsRenderer'

export const mixins = {
    CartDetails,
    ChartSettings,
    ChatRoom,
    CrudRoute,
    CrudTable,
    Decoratable,
    FormValidations,
    Iran,
    PaasApp,
    Product,
    ProductCategories,
    ProductList,
    ProductReviews,
    ResponseAlerts,
    Search,
    Themeable,
    TimestampFormatter,
    User,
    UserCartDetails,
    UserNotifications,
    UserProfile,
    UserProfileMethods,
    UserPurchasingCart,
    WidgetsRenderer,
}

// Declare install function executed by Vue.use()
export function install(Vue, options) {
	if (install.installed) return;
	install.installed = true;
    mixins.forEach(m => {
        Vue.mixin(m)
    })
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

export default plugin