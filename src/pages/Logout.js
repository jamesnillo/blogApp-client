import { Navigate } from 'react-router-dom';

import { useContext, useEffect } from 'react';

import UserContext from '../UserContext'; 

export default function Logout(){

	const { setUser, unsetUser } = useContext(UserContext);
	unsetUser();

	useEffect(() => {
		setUser({
			id: null,
			isAdmin: null
		})
		
	}, [])

	return(

		<Navigate to = '/login' />

	)
}