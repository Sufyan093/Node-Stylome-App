import React, { useState, useEffect } from 'react';
import Circle from '../../../assets/images/circle.svg';

import { useDispatch } from 'react-redux';
import { dispatchCustomService } from '../../../redux/actions/visitActions';

const CustomServices = ({ service }) => {
	const [state, setState] = useState({
		primary: true,
		secondary: false,
		tertiary: false,
		data: service.customServices.primary,
	});

	const { primary, secondary, tertiary, data } = state;

	const dispatch = useDispatch();

	useEffect(() => {
		const getCustomService = (data) => {
			return dispatch(dispatchCustomService(data));
		};
		getCustomService(data);
	}, [dispatch, data]);

	return (
		<div className='flex flex-col py-3 px-5'>
			<h2 className='uppercase font-semibold'>Choose Serivces</h2>
			<div className='custom-services-list flex flex-row justify-center my-3'>
				<div
					data-primary={service.customServices.primary}
					onClick={(e) => {
						setState({
							...state,
							primary: true,
							secondary: false,
							tertiary: false,
							data: service.customServices.primary,
						});
						// console.log(e.currentTarget.getAttribute('data-primary'));
					}}
					className={`${
						primary ? 'customServiceSelect' : ''
					} custom-servicee  w-32 py-2 cursor-pointer mx-2 rounded-3xl`}
				>
					<div className='flex flex-col justify-center items-center'>
						<p>{service.customServices.primary.name}</p>
						<img src={Circle} alt='' className='w-14' />
					</div>
					<p className='flex flex-row justify-around'>
						<span>{service.customServices.primary.price}RS</span>
						<span>{service.customServices.primary.slots * 30}min</span>
					</p>
				</div>

				<div
					onClick={() => {
						setState({
							...state,
							primary: false,
							secondary: true,
							tertiary: false,
							data: service.customServices.secondary,
						});
					}}
					className={`${
						secondary ? 'customServiceSelect' : ''
					} custom-servicee cursor-pointer w-32 py-2 mx-2 rounded-3xl`}
				>
					<div className='flex flex-col justify-center items-center'>
						<p>{service.customServices.secondary.name}</p>
						<img src={Circle} alt='' className='w-14' />
					</div>
					<p className='flex flex-row justify-around'>
						<span>{service.customServices.secondary.price}RS</span>
						<span>{service.customServices.secondary.slots * 30}min</span>
					</p>
				</div>

				<div
					onClick={() => {
						setState({
							...state,
							primary: false,
							secondary: false,
							tertiary: true,
							data: service.customServices.tertiary,
						});
					}}
					className={`${
						tertiary ? 'customServiceSelect' : ''
					} custom-servicee cursor-pointer w-32 py-2 mx-2 rounded-3xl`}
				>
					<div className='flex flex-col justify-center items-center'>
						<p>{service.customServices.tertiary.name}</p>
						<img src={Circle} alt='' className='w-14' />
					</div>
					<p className='flex flex-row justify-around'>
						<span>{service.customServices.tertiary.price}RS</span>
						<span>{service.customServices.tertiary.slots * 30}min</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CustomServices;
