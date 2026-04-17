/**
 * 浪沙虾友 · 工具函数
 * 纯函数，无任何外部依赖
 */

const RESERVED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 去除了易混淆字符 (0,O,1,I,Q)

/**
 * 生成唯一虾友ID：LS-XY + 8位随机字符
 */
export function generateShrimpId() {
  const id = Array.from(
    { length: 8 },
    () => RESERVED_CHARS[Math.floor(Math.random() * RESERVED_CHARS.length)]
  ).join('');
  return `LS-XY${id}`;
}

/**
 * 昵称脱敏：保留首字符 + 星号遮蔽
 */
export function maskNickname(name) {
  if (!name || name.length === 0) return '*';
  return name[0] + '*'.repeat(Math.max(name.length - 1, 1));
}

/**
 * 手机号脱敏：前3位 + **** + 后4位
 */
export function maskPhone(phone) {
  if (!phone || phone.length < 7) return phone;
  return phone.slice(0, 3) + '****' + phone.slice(-4);
}

/**
 * 动态欢迎祝福模板
 */
const BLESSING_TEMPLATES = [
  (nick) => `恭喜 ${nick} 虾友入驻浪沙社区，小店已为你备好专属海鲜礼遇，随时恭候到店领取`,
  (id) => `欢迎 ${id} 加入浪沙虾友，一份专属到店好礼已为你预留，期待与你相遇`,
  (nick) => `喜迎 ${nick} 成为浪沙虾友，到店即可兑换专属海鲜好礼，不负相遇`,
];

/**
 * 随机选取一条欢迎语，注入昵称或虾友ID
 */
export function generateBlessing(shrimpId, nickMasked) {
  const template = BLESSING_TEMPLATES[Math.floor(Math.random() * BLESSING_TEMPLATES.length)];
  // 根据模板参数类型注入
  return template.length === 1 ? template(shrimpId) : template(nickMasked);
}

/**
 * 校验手机号格式
 */
export function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}
