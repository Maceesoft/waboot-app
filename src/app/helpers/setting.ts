export const Setting = {
    debug : false,
    domain : 'https://wb.maceesoft.com',
    local : 'http://localhost:5211',
    getDomain : ()=> Setting.debug? Setting.local : Setting.domain
  }