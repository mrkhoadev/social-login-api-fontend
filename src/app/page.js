"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import getProfile from "./utils/profile";
import { handleGetRedirect } from "./utils/login";
import { getUserList } from "./utils/users"
import Button from "./components/Button";
import Table from "./components/Table";
import { providers } from "./configs";

export default function Home() {
  const [profile, setProfile] = useState();
  const [userList, setUserList] = useState();
  const [isRender, setISRender] = useState(false);
	const handleRedirect = async (provider) => {
		const redirect = await handleGetRedirect(provider);
		if (redirect) {
			window.location.href = redirect;
		}
	};
	const handleLogin = async (accessToken) => {
		const [profile, userList] = await Promise.all([
      getProfile(accessToken), 
      getUserList(accessToken)
    ]);

		if (profile) {
			setProfile(profile);
      		setUserList(userList)
		} else {
			localStorage.removeItem('accessToken');
		}
	};
	useEffect(() => {
		setISRender(true);
    	if (localStorage.accessToken) {
			handleLogin(localStorage.accessToken);
		}
	}, []);
  if (!isRender) {
	return <h1>Loading...</h1>
  }
  return (
		<div className='flex items-center flex-col gap-4 mt-4 container mx-auto'>
			{!profile ? (
				<>
					<Button onClick={() => handleRedirect('google')}>
						Nút này để đăng nhập với Google
					</Button>
					<Button onClick={() => handleRedirect('github')}>
						Nút này để đăng nhập với Github
					</Button>
				</>
			) : (
        <div className="flex-1">
          <div className="flex items-center justify-start mb-2 gap-x-5">
            <Image src={profile.thumbnail} alt={profile.name} priority width={100} height={100} />
            <ul>
              <li>name: {profile.name}</li>
              <li>email: {profile.email}</li>
              <li>
				<div className="flex gap-3">
					{ providers.map((provider, index) => {
							const result = profile.providers.find((p) => p.name === provider);
							if (result) {
								return <p key={index} className={`bg-${!index ? "blue" : "green"}-400 px-4 py-1 rounded-md text-white`}> {provider} đã đăng ký </p>
							} 
							return <p key={index} className={`bg-${!index ? "blue" : "green"}-400 px-4 py-1 rounded-md text-white`}> {provider} chưa đăng ký </p> 
						}) 
					} 
					<button 
						onClick={() => {
							localStorage.removeItem('accessToken');
							window.location.reload()
						}}
						className=" bg-red-500 text-white px-4 py-1 rounded-md"
					>
						Đăng xuất
                	</button>
				</div>
              </li>
            </ul>
          </div>
          <div className="w-[100%]">
            <Table data={userList} setUserList={setUserList} />
          </div>
        </div>
			)}
		</div>
	);
}
