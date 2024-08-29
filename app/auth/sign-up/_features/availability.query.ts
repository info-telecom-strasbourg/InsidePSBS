export const checkPhone = async (phone: string) => {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/register/availability?phone=${phone}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.ok;
};

export const checkUserName = async (user_name: string) => {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/register/availability?user_name=${user_name}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.ok;
};

export const checkEmail = async (email: string) => {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/register/availability?email=${email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.ok;
};
