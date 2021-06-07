const puppeteer = require('puppeteer');

async function robo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://accounts.google.com/signin/v2/identifier?service=cl&passive=1209600&osid=1&continue=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fr&followup=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fr&scc=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
  await page.type('#identifierId',"crasdefault@gmail.com")
  await page.click('[jsname="LgbsSe"]')
  await page.waitForTimeout(3000);
  await page.type('[jsname="YPqjbf"]',"#Gfgrupo8")
  await page.click('[jsname="LgbsSe"]')
  await page.waitForNavigation();
  await page.click('[jsname="vTZnL"]')
  await page.waitForTimeout(3000);
  await page.type('[data-initial-value]',"Manuteção Maquina")
  await page.click('[jsname="x8hlje"]')
  await browser.close();
}

robo();