/**
 * 浪沙虾友 · 配置管理
 *
 * 商家使用时需修改 FEISHU_FORM_URL 为真实的飞书表单公开链接
 */

// ========== 商家配置区域 ==========

/** 飞书表单公开填写链接 — 商家创建表单后替换此值 */
export const FEISHU_FORM_URL = 'https://xcnw4pyuw3gv.feishu.cn/share/base/form/shrcn36WDzf1e907WNfz78JbQSg';

/** 飞书多维表格只读链接（用于公开展示虾友台账） */
export const FEISHU_BITABLE_URL = 'https://xcnw4pyuw3gv.feishu.cn/wiki/HS9UwGJIiiksJak3kcSc0s6onDh?from=from_copylink';

// ========== 门店信息 ==========

export const STORE_INFO = {
  storeName: '浪沙海鲜谷',
  address: '海南省陵水黎族自治县英州镇清水湾大道瀚海银滩对面',
  location: {
    latitude: 18.4135,
    longitude: 109.8278,
  },
  notice: '院内可免费停车',
};

// ========== 欢迎语模板 ==========

export const BLESSING_TEMPLATES = [
  (nick) => `恭喜 ${nick} 虾友入驻浪沙社区，小店已为你备好专属海鲜礼遇，随时恭候到店领取`,
  (id) => `欢迎 ${id} 加入浪沙虾友，一份专属到店好礼已为你预留，期待与你相遇`,
  (nick) => `喜迎 ${nick} 成为浪沙虾友，到店即可兑换专属海鲜好礼，不负相遇`,
];
