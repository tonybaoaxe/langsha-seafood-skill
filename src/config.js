/**
 * 浪沙虾友 · 配置管理
 *
 * 商家使用时需修改 TENCENT_FORM_URL 和 TENCENT_BITABLE_URL 为真实的腾讯文档链接
 */

// ========== 商家配置区域 ==========

/** 腾讯文档表单公开填写链接（对应扫二维码填表） */
export const TENCENT_FORM_URL = 'https://docs.qq.com/smartsheet/form/SuRXvMYnkIBo%2Fexmo3h%2FvnT74w?tab=exmo3h';

/** 腾讯文档多维表格只读链接（用于公开展示虾友台账） */
export const TENCENT_BITABLE_URL = 'https://docs.qq.com/smartsheet/DU3VSWHZNWW5rSUJv?tab=exmo3h';

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
