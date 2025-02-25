export function returnHTML(code: number): string {
  return `
	 <div style="width: 100%; padding: 20px 0; text-align: center;">
    <table align="center" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <h2 style="font-family: Arial, sans-serif; font-size: 24px; color: #333;">
            Подтверждение регистрации
          </h2>
          <h3 style="font-family: Arial, sans-serif; font-weight: 500; font-size: 18px;">
            Спасибо за регистрацию в нашем магазине!
          </h3>
          <p style="font-family: Arial, sans-serif; font-size: 16px; color: #555;">
            Для подтверждения почты введите этот код на сайте:
          </p>
          <span style="font-family: sans-serif; letter-spacing: 8px; color: darkcyan; font-weight: 700; font-size: 56px; display: inline-block; margin: 10px 0;">
            ${code}
          </span>
          <p style="font-family: Arial, sans-serif; font-size: 16px; color: #555;">
            Приятного использования!
          </p>
        </td>
      </tr>
    </table>
  </div>
	`
}
