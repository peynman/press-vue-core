import PressCore from './PressCore'

// Declare install function executed by Vue.use()
export function install(Vue, options) {
	if (install.installed) return;
	install.installed = true;
	const press = new PressCore(options);
	press.install(Vue)
	Vue.prototype.$press = press
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

export default plugin