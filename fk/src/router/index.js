import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     redirect: '/riskTrend'
        // },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/',
                    redirect: '/riskTrend'
                },

                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: {
                        title: '基础表格'
                    }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: {
                        title: 'tab选项卡'
                    }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: {
                        title: '基本表单'
                    }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: {
                        title: 'schart图表'
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: {
                        title: '拖拽列表'
                    }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: {
                        title: '权限测试',
                        permission: true
                    }
                },
                {
                    //风险趋势
                    path: '/riskTrend',
                    component: resolve => require(['../components/page/HS_marketRisk/HS_riskTrend.vue'], resolve),
                    meta: {
                        title: '风险趋势'
                    }
                },
                {
                    //风控结果展示
                    path: '/riskControlResult',
                    component: resolve => require(['../components/page/HS_statisticsStatements/HS_riskControlResults.vue'], resolve),
                    meta: {
                        title: '风控结果展示'
                    }
                },
                {
                    //运营商报告列表
                    path: '/operatorReport',
                    component: resolve => require(['../components/page/HS_creditReport/HS_operatorReport.vue'], resolve),
                    meta: {
                        title: '运营商报告列表'
                    }
                },
                {
                    //信贷预测报告列表
                    path: '/creditPredict',
                    component: resolve => require(['../components/page/HS_creditReport/HS_creditPredict.vue'], resolve),
                    meta: {
                        title: '信贷预测报告列表'
                    }
                },
                {
                    //消费明细
                    path: '/consumptionDetail',
                    component: resolve => require(['../components/page/HS_financialManagement/HS_consumptionDetail.vue'], resolve),
                    meta: {
                        title: '消费明细'
                    }
                },
                {
                    //客户消费详情
                    path: '/customerConsumption',
                    component: resolve => require(['../components/page/HS_financialManagement/HS_customerConsumption.vue'], resolve),
                    meta: {
                        title: '客户消费详情'
                    }
                },
                {
                    //新增用户决策管理
                    path: '/userDecision',
                    component: resolve => require(['../components/page/HS_configurationManagement/HS_userDecision.vue'], resolve),
                    meta: {
                        title: '新增用户决策管理'
                    }
                },
                {
                    //复贷用户决策管理
                    path: '/reditDecision',
                    component: resolve => require(['../components/page/HS_configurationManagement/HS_creditDecision.vue'], resolve),
                    meta: {
                        title: '复贷用户决策管理'
                    }
                },
                {
                    //基本资料
                    path: '/basicInformation',
                    component: resolve => require(['../components/page/HS_accountManagement/HS_basicInformation.vue'], resolve),
                    meta: {
                        title: '基本资料'
                    }
                },
                {
                    //密码管理
                    path: '/passwordManagement',
                    component: resolve => require(['../components/page/HS_accountManagement/HS_passwordManagement.vue'], resolve),
                    meta: {
                        title: '密码管理'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
