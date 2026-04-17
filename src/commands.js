import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateShrimpId, maskNickname, maskPhone, generateBlessing, isValidPhone } from './utils.js';
import { FEISHU_FORM_URL, STORE_INFO, BLESSING_TEMPLATES } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '.data');
const USER_FILE = path.join(DATA_DIR, 'user.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadUserData() {
  if (fs.existsSync(USER_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(USER_FILE, 'utf-8'));
    } catch {
      return null;
    }
  }
  return null;
}

function saveUserData(data) {
  ensureDataDir();
  fs.writeFileSync(USER_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ========== 命令实现 ==========

/** 认证浪沙虾友 */
export async function cmdRegister() {
  const existing = loadUserData();
  if (existing) {
    console.log(`\n你已经是虾友了！虾友ID：${existing.shrimpId}`);
    console.log(`昵称：${existing.nicknameMasked}\n`);
    return;
  }

  console.log('\n🦐 浪沙虾友认证\n');

  const nickname = (await prompt('请输入你的昵称：')).trim();
  if (!nickname) {
    console.log('昵称不能为空，请重新开始。');
    return;
  }

  const phone = (await prompt('请输入你的手机号（仅用于到店核验）：')).trim();
  if (!isValidPhone(phone)) {
    console.log('手机号格式不正确，请重新开始。');
    return;
  }

  // 生成身份
  const shrimpId = generateShrimpId();
  const nickMasked = maskNickname(nickname);
  const phoneMasked = maskPhone(phone);
  const blessing = generateBlessing(shrimpId, nickMasked);

  // 保存本地（脱敏数据）
  saveUserData({
    shrimpId,
    nicknameMasked: nickMasked,
    phoneMasked,
    createdAt: new Date().toISOString(),
    status: '可领取',
  });

  // 展示信息
  console.log('\n✅ 认证信息已生成：');
  console.log(`  虾友ID：${shrimpId}`);
  console.log(`  昵称：${nickMasked}`);
  console.log(`  手机：${phoneMasked}`);
  console.log(`  欢迎语：${blessing}`);

  // 引导填写飞书表单
  console.log('\n📋 请完成最后一步：在飞书表单中提交信息');
  console.log(`打开链接：${FEISHU_FORM_URL}`);
  console.log('\n表单只需填写两项：');
  console.log(`  昵称：${nickMasked}`);
  console.log(`  手机号：${phone}`);
  console.log('\n其他信息由系统自动处理，你只需提交表单即可。\n');
}

/** 查看我的虾友信息 */
export async function cmdMyInfo() {
  const user = loadUserData();
  if (!user) {
    console.log('你还没有认证虾友身份，请先运行「认证浪沙虾友」。');
    return;
  }
  console.log('\n🦐 我的虾友信息：');
  console.log(`  虾友ID：${user.shrimpId}`);
  console.log(`  昵称：${user.nicknameMasked}`);
  console.log(`  手机：${user.phoneMasked}`);
  console.log(`  入驻时间：${user.createdAt}`);
  console.log(`  权益状态：${user.status}\n`);
}

/** 生成邀请码 */
export async function cmdInviteCode() {
  const user = loadUserData();
  if (!user) {
    console.log('你还没有认证虾友身份，请先运行「认证浪沙虾友」。');
    return;
  }
  console.log('\n📮 你的邀请信息：');
  console.log(`  邀请人ID：${user.shrimpId}`);
  console.log('  分享给好友即可，无任务绑定，无强制裂变。\n');
}

/** 查看门店位置 */
export async function cmdStoreLocation() {
  const { storeName, address, location, notice } = STORE_INFO;
  console.log(`\n📍 ${storeName}`);
  console.log(`  地址：${address}`);
  console.log(`  坐标：${location.latitude}, ${location.longitude}`);
  console.log(`  提示：${notice}`);
  console.log(`  导航链接：https://uri.amap.com/marker?position=${location.longitude},${location.latitude}&name=${encodeURIComponent(storeName)}\n`);
}

/** 核销虾友专属礼遇 */
export async function cmdRedeem() {
  const user = loadUserData();
  if (!user) {
    console.log('你还没有认证虾友身份，请先运行「认证浪沙虾友」。');
    return;
  }
  console.log('\n🎁 虾友礼遇核销：');
  console.log('到店后请找门店经理：');
  console.log(`  手机：${user.phoneMasked}\n`);
  console.log('经理核对后即可领取专属海鲜礼遇！\n');
}

/** 主入口 — 交互式菜单 */
export async function main() {
  while (true) {
    console.log('╔══════════════════════════════════════╗');
    console.log('║   浪沙海鲜谷 · 虾友会员服务          ║');
    console.log('╚══════════════════════════════════════╝');
    console.log('');
    console.log('选择你要执行的操作：');
    console.log('  1. 认证浪沙虾友');
    console.log('  2. 我的虾友信息');
    console.log('  3. 生成我的邀请码');
    console.log('  4. 浪沙海鲜谷位置');
    console.log('  5. 核销虾友专属礼遇');
    console.log('  0. 退出');
    console.log('');

    const choice = (await prompt('请输入操作数字：')).trim();

    switch (choice) {
      case '1':
        await cmdRegister();
        break;
      case '2':
        await cmdMyInfo();
        break;
      case '3':
        await cmdInviteCode();
        break;
      case '4':
        await cmdStoreLocation();
        break;
      case '5':
        await cmdRedeem();
        break;
      case '0':
        console.log('再见！');
        rl.close();
        return;
      default:
        console.log('无效的输入，请重新输入。');
    }

    console.log('');
  }
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  main().catch((err) => {
    console.error('出错了：', err.message);
    rl.close();
    process.exit(1);
  });
}
