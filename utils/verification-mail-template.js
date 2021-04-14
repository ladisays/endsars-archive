export const textTemplate = (code, link) => {
  if (code && link) {
    return `Your verification code is - ${code}\nYou can also sign in with this link - ${link}`;
  }
  return '';
};

export const htmlTemplate = (code, link) => {
  if (code && link) {
    return `
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
        <tbody>
          <tr>
            <td align="center" valign="top" bgcolor="#D1D1D1" width="100%" style="padding:40px 0;background-color:#D1D1D1">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;max-width:580px;min-width:300px;margin:0 auto;">
                <tbody>
                  <tr>
                    <td align="center" valign="top" bgcolor="#ffffff" style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;padding:40px 0;border-radius:20px;">
                      <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:center;vertical-align:top;width:100%">
                        <tbody>
                          <tr>
                            <td align="center" valign="top" style="padding:0 40px">
                                <a href="https://www.endsarsarchived.com" style="margin:0;font-weight:normal;line-height:1;margin:0;padding:0;text-align:left;text-decoration:none" target="_blank">
                                  ENDSARS Archived
                                </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                        <tbody>
                          <tr style="padding:0;text-align:left;vertical-align:top">
                            <td align="center" valign="top" height="30px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:30px;font-weight:normal;line-height:30px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                      <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                        <tbody>
                          <tr>
                            <td align="left" valign="top" style="padding:0 40px">
                              <h1>Verification Code</h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                        <tbody>
                          <tr>
                            <td align="left" valign="top" style="padding:0 40px;">
                              <code style="font-size: 48px;margin:0;padding:0">${code.toUpperCase()}</code>
                              <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                <tbody>
                                  <tr style="padding:0;text-align:left;vertical-align:top">
                                    <td align="center" valign="top" height="10px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:10px;font-weight:normal;line-height:10px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                  </tr>
                                </tbody>
                              </table>
                              Code expires in 10 minutes.
                              <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                <tbody>
                                  <tr style="padding:0;text-align:left;vertical-align:top">
                                    <td align="center" valign="top" height="20px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                  </tr>
                                </tbody>
                              </table>
                              <h2 style="font-weight:400">Try instant sign-in on this device.</h2>
                              Use the button below to access your account instantly.
                              <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                <tbody>
                                  <tr style="padding:0;text-align:left;vertical-align:top">
                                    <td align="center" valign="top" height="50px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:50px;font-weight:normal;line-height:50px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                  </tr>
                                </tbody>
                              </table>
                              <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:center;vertical-align:top;width:100%">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top">
                                      
                                      <a href="${link}" style="box-sizing:border-box;border:2px solid #011627;border-radius:5px;color:#ffffff;display:inline-block;font-family:'Inter','Helvetica','Arial',sans-serif;font-size:20px;font-weight:600;padding:14px 40px;text-align:center;text-decoration:none;background-color:#011627" target="_blank">
                                        Sign In
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table role="presentation" style="border:none;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%">
                                <tbody>
                                  <tr style="padding:0;text-align:left;vertical-align:top">
                                    <td align="center" valign="top" height="50px" style="margin:0;border-collapse:collapse!important;color:#001d2f;font-size:50px;font-weight:normal;line-height:50px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp;</td>
                                  </tr>
                                </tbody>
                              </table>
                              Link expires within 1 hour and can only be used once.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }
  return '';
};
