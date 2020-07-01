// 路由

const Basicinfo = () => import('@/views/account/user/register/register-basicinfo.vue')
const Edu = () => import('@/views/account/user/register/register-edu.vue')
const Jw = () => import('@/views/account/user/register/register-jw.vue')
const Index = () => import('@/views/account/user/register/index.vue')
const Orgnav = () => import('@/components/orgbacknav/orgbacknav.vue')
const OrgIndex = () => import('@/views/account/org/register/index')
const ACCOUNT_ORG_REGISTER_STEP_1 = () => import('@/views/account/org/register/register-step1')
const ACCOUNT_ORG_REGISTER_STEP_2 = () => import('@/views/account/org/register/register-step2')
const ACCOUNT_ORG_REGISTER_STEP_3 = () => import('@/views/account/org/register/register-step3')
const OrgResetPwd = () => import('@/views/account/org/org-reset-pwd.vue')
const UserResetPwd = () => import('@/views/account/user/person-reset-pwd.vue')
const UserBindingvePhone = () => import('@/views/account/user/binding/phone.vue')
const UserBindingEmail = () => import('@/views/account/user/binding/email.vue')
const OrgBindingvePhone = () => import('@/views/account/org/binding/phone.vue')
const OrgBindingEmail = () => import('@/views/account/org/binding/email.vue')

// 账户中心
const OrgAccountIndex = () => import('@/views/user/org/account/account.vue')
const OrgAccountOrgInfo = () => import('@/views/user/org/account/info.vue')
const OrgAccountSetting = () => import('@/views/user/org/account/setting.vue')
const OrgAccountOrgPersonalInfox = () => import('@/views/user/org/account/personal-info.vue')
const OrgAccountCompanyinfo = () => import('@/views/user/org/account/company-info.vue')
const OrgAccountUploadLicense = () => import('@/views/user/org/account/upload-license.vue')

export default [{
        path: '/account/user/register/index',
        name: 'CmpRegisterIndex',
        meta: {
            title: '注册页面',
            keepAlive: false,
            auth: false,
            roles: ['user']
        },
        components: {
            body: Index
        }
    },
    {
        path: '/account/user/register/basicinfo',
        name: 'PATH_ACCOUNT_USER_REGISTER_SETP_1',
        meta: {
            title: '基本信息',
            keepAlive: false,
            auth: true,
            roles: ['user']
        },
        components: {
            body: Basicinfo
        }
    },
    {
        path: '/account/user/register/edu',
        name: 'PATH_ACCOUNT_USER_REGISTER_SETP_2',
        meta: {
            title: '教育经历',
            keepAlive: false,
            auth: true,
            roles: ['user']
        },
        components: {
            body: Edu
        }
    },
    {
        path: '/account/user/register/jw',
        name: 'PATH_ACCOUNT_USER_REGISTER_SETP_3',
        meta: {
            title: '工作意向',
            keepAlive: false,
            auth: true,
            roles: ['user']
        },
        components: {
            body: Jw
        }
    },
    {
        path: '/account/user/reset/pwd',
        name: 'CmpUserPersonResetPwd',
        meta: {
          title: '个人找回密码',
          keepAlive: false,
          auth: false,
          roles: ['user']
        },
        components: {
            body: UserResetPwd
        }
    },
    {
        path: '/account/user/bindingve/phone',
        name: 'CmpUserBindingvePhone',
        meta: {
          title: '绑定手机',
          keepAlive: false,
          auth: false,
          roles: ['user']
        },
        components: {
            body: UserBindingvePhone
        }
    },
    {
        path: '/account/user/bindingve/email',
        name: 'CmpUserBindingEmail',
        meta: {
          title: '绑定邮箱',
          keepAlive: false,
          auth: false,
          roles: ['user']
        },
        components: {
            body: UserBindingEmail
        }
    },
    /** -------------------企业注册信息----------------- */
    {
        path: '/account/org/register/index',
        name: 'CmpOrgMain',
        redirect: '/account/org/register/personInfo',
        name: 'PATH_ACCOUNT_ORG_REGISTER_INDEX',
        meta: {
            title: '企业注完善个人信息',
            keepAlive: false,
            auth: true
        },
        components: {
            body: OrgIndex
        },
        children: [{
            path: '/account/org/register/personInfo',
            query: {
              active: 0
            },
            query: {
              active: 0
            },
            name: 'PATH_ACCOUNT_ORG_REGISTER_STEP_1',
            meta: {
              title: '企业注完善信息',
              keepAlive: false,
              auth: true
            },
            components: {
              default: ACCOUNT_ORG_REGISTER_STEP_1
            }
        }, {
            path: '/account/org/register/companyinfo',
            query: {
              active: 1
            },
            name: 'PATH_ACCOUNT_ORG_REGISTER_STEP_2',
            meta: {
              title: '企业注完善信息',
              keepAlive: false,
              auth: true
            },
            components: {
                default: ACCOUNT_ORG_REGISTER_STEP_2
            }
        },{
            // /account/org/register/steptow
            path: '/account/org/register/completeinfo',
            query: {
                active: 2
            },
            name: 'PATH_ACCOUNT_ORG_REGISTER_STEP_3',
            meta: {
              title: '企业注完善信息',
              keepAlive: false,
              auth: true
            },
            components: {
                default: ACCOUNT_ORG_REGISTER_STEP_3
            }
        }]
    },
    {
        path: '/account/org/reset/pwd',
        name: 'CmpOrgResetPwd',
        meta: {
          title: '企业找回密码',
          keepAlive: false,
          auth: false
        },
        components: {
            body: OrgResetPwd
        }
    },
    {
        path: '/account/org/bindingve/phone',
        name: 'CmpOrgBindingvePhone',
        meta: {
          title: '绑定手机',
          keepAlive: false,
          auth: false,
          roles: ['user']
        },
        components: {
            body: OrgBindingvePhone
        }
    },
    {
        path: '/account/org/bindingve/email',
        name: 'CmpOrgBindingEmail',
        meta: {
          title: '绑定邮箱',
          keepAlive: false,
          auth: false,
          roles: ['user']
        },
        components: {
            body: OrgBindingEmail
        }
    },
    {
        path: '/user/org/account/index',
        name: 'CmpOrgAccountIndex',
        redirect: '/user/org/account/org/personalinfox',
        meta: {
            title: '账户中心',
            keepAlive: false,
            auth: true,
        },
        components: {
            Head: Orgnav,
            body: OrgAccountIndex
        },
        children:[
            {
                path: '/user/org/account/org/personalinfox',
                name: 'CmpOrgAccountOrgPersonalInfox',
                meta: {
                title: '个人信息',
                keepAlive: true,
                auth: true
                },
                component: OrgAccountOrgPersonalInfox
            },
            {
                path: '/user/org/account/orginfo',
                name: 'CmpOrgAccountOrgInfo',
                meta: {
                title: '企业信息',
                keepAlive: true,
                auth: true
                },
                component: OrgAccountOrgInfo,
            },
            {
                path: '/user/org/account/setting',
                name: 'CmpOrgAccountSetting',
                meta: {
                title: '账户设置',
                keepAlive: true,
                auth: true
                },
                component: OrgAccountSetting
            },
            {
                path: '/user/org/account/uploadlicense',
                name: 'CmpOrgAccountUploadLicense',
                meta: {
                title: '上传营业执照',
                keepAlive: true,
                auth: true
                },
                component: OrgAccountUploadLicense
            },
            {
                path: '/user/org/account/companyinfo',
                name: 'CmpOrgAccountCompanyinfo',
                meta: {
                title: '补充公司信息',
                keepAlive: true,
                auth: true
                },
                component: OrgAccountCompanyinfo
            },
        ]
    },
]