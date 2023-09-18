export async function Csrf(){
  const response = await fetch('http://localhost:3000/api/auth/csrf')
  const responseObject = await response.json()
  const csrfToken = responseObject.csrfToken;

  console.log(csrfToken)
  return <input type="hidden" name="csrfToken" value={csrfToken} />
}