import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const BASE = 'https://smartthermostatmanufacturer.com';

const IMAGE_MAP = {
  // Hero Banner
  'public/images/hero/slide-1.jpg': '/uploads/53786120_1773153995.jpg',
  'public/images/hero/slide-2.jpg': '/uploads/10564823_1773126494.jpg',
  'public/images/hero/slide-1-mobile.jpg': '/uploads/31062789_1773155089.jpg',
  'public/images/hero/slide-2-mobile.jpg': '/uploads/64075921_1773155386.jpg',

  // Tailor-Made Solution & ODM
  'public/images/services/banner.jpg': '/uploads/84915736_1702017363.jpg',
  'public/images/services/odm-banner.jpg': '/uploads/74239510_1702632299.jpg',
  'public/images/services/intro.jpg': '/uploads/62418097_1773127520.jpg',
  'public/images/services/smart-home.jpg': '/uploads/54827196_1774462846.jpg',
  'public/images/services/pcb.jpg': '/uploads/67291345_1774461897.jpg',
  'public/images/services/app.jpg': '/uploads/65408917_1704887482.jpg',
  'public/images/services/structural.jpg': '/uploads/82049156_1774460871.jpg',
  'public/images/services/odm-1.png': '/uploads/38524106_1773127987.png',
  'public/images/services/odm-2.png': '/uploads/98132745_1773129416.png',
  'public/images/services/odm-3.png': '/uploads/69302748_1773130033.png',
  'public/images/services/odm-4.png': '/uploads/26703491_1773132189.png',
  'public/images/services/odm-5.png': '/uploads/24851967_1773131995.png',
  'public/images/services/odm-6.png': '/uploads/31708624_1773132765.png',
  'public/images/services/odm-7.png': '/uploads/43105872_1779842095.png',
  'public/images/services/odm-8.png': '/uploads/17328590_1779844293.png',
  'public/images/services/odm-9.png': '/uploads/30849526_1779846472.png',
  'public/images/services/odm-10.png': '/uploads/86350179_1774367188.png',
  'public/images/services/odm-11.png': '/uploads/64807351_1774368645.png',
  'public/images/services/odm-12.png': '/uploads/61847903_1774441322.png',

  // Products — Homepage 2x2 dark studio plinth showcase
  'public/images/products/dark-1.jpg': '/uploads/92830175_1773126353.jpg',
  'public/images/products/dark-2.jpg': '/uploads/30156498_1773126364.jpg',
  'public/images/products/dark-3.jpg': '/uploads/51089427_1773126375.jpg',
  'public/images/products/dark-4.jpg': '/uploads/64980315_1773126384.jpg',
  'public/images/products/dark-5.jpg': '/uploads/85294170_1778509883.jpg',
  'public/images/products/dark-6.jpg': '/uploads/58413920_1778510010.jpg',
  'public/images/products/dark-7.jpg': '/uploads/84159726_1778516146.jpg',
  'public/images/products/dark-8.jpg': '/uploads/93428710_1778515940.jpg',
  'public/images/products/dark-9.jpg': '/uploads/06854923_1778515718.jpg',
  'public/images/products/dark-10.jpg': '/uploads/12450879_1778515406.jpg',

  // Products — Catalog Banner & Light Studio Cutouts
  'public/images/products/pro-banner.png': '/uploads/05127963_1769473047.png',
  'public/images/products/prod-trv-1.jpg': '/uploads/41897236_1788330230.jpg',
  'public/images/products/prod-trv-2.png': '/uploads/96081274_1784533674.png',
  'public/images/products/prod-round-1.png': '/uploads/91073864_1780016089.png',
  'public/images/products/prod-black-1.png': '/uploads/63910754_1769470865.png',
  'public/images/products/prod-white-1.png': '/uploads/85714632_1769362203.png',
  'public/images/products/prod-knob-1.png': '/uploads/79325410_1776603900.png',
  'public/images/products/prod-black-2.png': '/uploads/72813945_1769352640.png',
  'public/images/products/prod-oem-1.png': '/uploads/45791320_1776590502.png',
  'public/images/products/prod-white-2.png': '/uploads/84902156_1769177823.png',
  'public/images/products/prod-prog-1.png': '/uploads/21598460_1776404436.png',
  'public/images/products/prod-hub-1.png': '/uploads/84265137_1779635568.png',
  'public/images/products/prod-switch-1.png': '/uploads/43625891_1784477873.png',
  'public/images/products/prod-switch-2.png': '/uploads/69174385_1784477714.png',
  'public/images/products/prod-detail-hero.png': '/uploads/70682491_1784534440.png',
  'public/images/products/prod-detail-1.jpg': '/uploads/76398215_1784534710.jpg',
  'public/images/products/prod-detail-2.jpg': '/uploads/79468352_1784535057.jpg',
  'public/images/products/prod-detail-3.jpg': '/uploads/43798625_1784535664.jpg',

  // Solutions / Applications
  'public/images/solutions/banner.jpg': '/uploads/64192305_1702107359.jpg',
  'public/images/solutions/underfloor.jpg': '/uploads/31842057_1776683614.jpg',
  'public/images/solutions/commercial.jpg': '/uploads/68109345_1776690660.jpg',
  'public/images/solutions/boiler.jpg': '/uploads/62345071_1776670298.jpg',
  'public/images/solutions/energy-saving.jpg': '/uploads/53479268_1776693325.jpg',
  'public/images/solutions/smart-home.jpg': '/uploads/98541073_1776675299.jpg',
  'public/images/solutions/oem-odm.png': '/uploads/50783621_1776676362.png',

  // Factory, About Us, Our Advantages, Join Us, Contact
  'public/images/factory/home-about.jpg': '/uploads/53897206_1773836656.jpg',
  'public/images/factory/about-banner.jpg': '/uploads/76534218_1702106854.jpg',
  'public/images/factory/about-building.jpg': '/uploads/72361895_1774012457.jpg',
  'public/images/factory/rd-1.jpg': '/uploads/59713086_1702024221.jpg',
  'public/images/factory/rd-2.jpg': '/uploads/07249315_1706150695.jpg',
  'public/images/factory/env-1.jpg': '/uploads/56921487_1779201810.jpg',
  'public/images/factory/env-2.jpg': '/uploads/68139045_1779201811.jpg',
  'public/images/factory/env-3.jpg': '/uploads/72169840_1779201811.jpg',
  'public/images/factory/env-4.jpg': '/uploads/21084769_1779201810.jpg',
  'public/images/factory/env-5.jpg': '/uploads/80413597_1779201777.jpg',
  'public/images/factory/culture-bg.jpg': '/dist/images/cultureBg.jpg',
  'public/images/factory/history-bg.jpg': '/dist/images/historyBg.jpg',
  'public/images/factory/adv-rd-1.jpg': '/uploads/32746905_1702106668.jpg',
  'public/images/factory/adv-rd-2.jpg': '/uploads/48107526_1702106692.jpg',
  'public/images/factory/adv-rd-3.jpg': '/uploads/95410728_1702106749.jpg',
  'public/images/factory/innovation-bg.jpg': '/dist/images/innovationBg.jpg',
  'public/images/factory/manufacturing.jpg': '/dist/images/mc1.jpg',
  'public/images/factory/join-1.jpg': '/dist/images/ea1.jpg',
  'public/images/factory/join-2.jpg': '/dist/images/ea2.jpg',
  'public/images/factory/contact-map.jpg': '/uploads/65872140_1788861340.jpg',
  'public/images/factory/message-bg.jpg': '/dist/images/messageBg.jpg',

  // Blog / News
  'public/images/blog/banner.jpg': '/uploads/21309765_1702107194.jpg',
  'public/images/blog/art-1.jpg': '/uploads/94806175_1792140325.jpg',
  'public/images/blog/art-2.jpg': '/uploads/72180346_1792058172.jpg',
  'public/images/blog/art-3.jpg': '/uploads/42360587_1791971529.jpg',
  'public/images/blog/art-4.jpg': '/uploads/69807125_1788341858.jpg',
  'public/images/blog/art-5.jpg': '/uploads/12634905_1788336840.jpg',
  'public/images/blog/art-6.jpg': '/uploads/98134620_1788342346.jpg',
  'public/images/blog/art-7.jpg': '/uploads/98534172_1788343646.jpg',
  'public/images/blog/art-8.jpg': '/uploads/48695371_1785371792.jpg',
  'public/images/blog/art-9.jpg': '/uploads/96412857_1774364580.jpg',

  // Support & Videos
  'public/images/support/banner.jpg': '/dist/images/pcBannerSupportVideo.jpg',
  'public/images/support/vid-1.jpg': '/uploads/41983672_1788485968.jpg',
  'public/images/support/vid-2.jpg': '/uploads/87692501_1788485981.jpg',
  'public/images/support/vid-3.png': '/uploads/65823710_1785372912.png',
  'public/images/support/vid-4.jpg': '/uploads/75960123_1788486018.jpg',
  'public/images/support/vid-5.jpg': '/uploads/82065374_1788486030.jpg',
  'public/images/support/vid-6.jpg': '/uploads/58403691_1788486052.jpg',
  'public/images/support/vid-7.jpg': '/uploads/39460215_1788486071.jpg',
  'public/images/support/vid-8.jpg': '/uploads/13856492_1788486573.jpg',
};

async function main() {
  const entries = Object.entries(IMAGE_MAP);
  let ok = 0;
  let failed = [];
  for (const [dest, srcPath] of entries) {
    const url = BASE + srcPath;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          Referer: BASE + '/',
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 500) throw new Error(`Too small (${buf.length} bytes)`);
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      ok++;
      process.stdout.write('.');
    } catch (err) {
      failed.push({ dest, url, error: err.message });
      console.error(`\nFAIL ${dest} <- ${url}: ${err.message}`);
    }
  }
  console.log(`\nDownloaded ${ok}/${entries.length} images. Failed: ${failed.length}`);
  if (failed.length) {
    console.log(JSON.stringify(failed, null, 2));
    process.exitCode = 1;
  }
}

main();
