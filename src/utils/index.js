export const validateForm = (data) => {
  const { name,
    college,
    email, date,} = data;
  if (name === '' || college === 'Select' || email === '' || date === '')
    return false;
  else
    return true;
}
