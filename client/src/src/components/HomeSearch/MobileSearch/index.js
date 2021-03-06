import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

import { Button, IconButton, Switch } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const MobileSearch = () => {
	const [state, setState] = useState({
		step: 1,
		show: false,
		loadSalon: false,
		salon: '',
		resultSalon: [],
		type: '',
		location: '',
		err: '',
		success: '',
	});
	const { step, show, salon, type, location } = state;

	let history = useHistory();

	const handleChage = (e) => {
		// setState({ ...state, [e.target.name]: e.target.value, show: true });
	};

	const salonChange = async (e) => {
		setState({
			...state,
			show: true,
			loadSalon: true,
			salon: e.target.value,
			resultSalon: [],
		});

		const res = await axios.post('/api/search/saerchbyname', {
			salon: salon,
		});

		setState({
			...state,
			err: '',
			success: '',
			resultSalon: res.data,
			loadSalon: false,
			salon: e.target.value,
		});
	};

	const clickSalonSuggestion = (e) => {
		e.preventDefault();
		const salonId = e.currentTarget.getAttribute('data-id');
		console.log(salonId);
		history.push('/salon-info/' + salonId);
	};

	const selectDropDownvalue = (e) => {
		e.preventDefault();
		const name = e.currentTarget.getAttribute('data-name');
		if (step === 2) {
			setState({ ...state, type: name, show: !show });
		}
		if (step === 3) {
			setState({ ...state, location: name, show: !show });
		}
	};

	const searchQuery = (e) => {
		e.preventDefault();
		// search-results
		// const salonId = parseInt(e.currentTarget.getAttribute('data-id'));
		if (type || location) {
			history.push({
				pathname: '/search-results',
				search: `?${type && 'type=' + type}${type && location ? '&' : ''}${
					location && 'location=' + location
				}`,
			});
		}
	};

	const firstStep = (
		<div className='firstStep'>
			<div className='input__wrapper'>
				<SearchIcon className='search-icon' />
				<input
					type='text'
					className='salon'
					name='salon'
					placeholder='Searh by Salon'
					value={salon}
					onChange={salonChange}
				/>
				<IconButton
					onClick={() =>
						setState({
							...state,
							salon: '',
							resultSalon: [],
							loadSalon: false,
							show: false,
						})
					}
					className={`${salon ? 'visible' : 'invisible'}`}
				>
					<CancelIcon />
				</IconButton>
			</div>
			<Button
				className='setp1Btn'
				onClick={() => setState({ ...state, step: 2 })}
			>
				Next <ArrowRightAltIcon />
			</Button>
		</div>
	);
	const secStep = (
		<div className='secStep'>
			<div className='input__wrapper'>
				<ArrowDropDownIcon className='search-icon' />
				<input
					type='text'
					className='type'
					name='type'
					readOnly
					placeholder='Searh by Type'
					value={type}
					onClick={() => setState({ ...state, step: 2, show: true })}
					// onChange={handleChage}
				/>
				<IconButton
					onClick={() => setState({ ...state, type: '' })}
					className={`${type ? 'visible' : 'invisible'}`}
				>
					<CancelIcon />
				</IconButton>
			</div>
			<div>
				<Button
					className='Backsetp2Btn'
					onClick={() => setState({ ...state, step: 1 })}
				>
					Back
				</Button>
				<Button
					className='setp2Btn'
					onClick={() => setState({ ...state, step: 3 })}
				>
					Next <ArrowRightAltIcon />
				</Button>
			</div>
		</div>
	);

	const thirdStep = (
		<div className='thirdStep'>
			<div className='input__wrapper'>
				<RoomIcon className='search-icon' />
				<input
					type='text'
					className='location'
					name='location'
					placeholder='Searh by location'
					value={location}
					onChange={(e) => setState({ ...state, location: e.target.value })}
				/>
				<IconButton
					onClick={() => setState({ ...state, location: '' })}
					className={`${location ? 'visible' : 'invisible'}`}
				>
					<CancelIcon />
				</IconButton>
			</div>
			<Button
				className='Backsetp3Btn'
				onClick={() => setState({ ...state, step: 2 })}
			>
				Back
			</Button>
			<Button className='setp3Btn' onClick={searchQuery}>
				<SearchIcon /> Search
			</Button>
		</div>
	);

	return (
		<div className='mobileSearch'>
			<form autoComplete='off'>
				<div className='search__wrapper'>
					{state.step === 1 && firstStep}
					{state.step === 2 && secStep}
					{state.step === 3 && thirdStep}
				</div>
			</form>

			<div className={`${salon ? 'visible' : 'invisible'}`}>
				<div className='m-suggestions m-suggestions-name bg-white mt-1 w-2/4 h-64 absolute rounded-xl overflow-scroll'>
					{state.loadSalon ? (
						<div className='flex justify-center items-center h-full'>
							<CircularProgress color='primary' />
						</div>
					) : (
						<ul className='p-5'>
							{state.resultSalon.map((result) => (
								<li
									key={result._id}
									data-id={result._id}
									className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
									onClick={clickSalonSuggestion}
								>
									<img
										className='w-16 h-10 rounded-lg mr-2'
										src={
											result.showcase
												? result.showcase
												: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Very_Black_screen.jpg'
										}
										alt={result.name}
									/>
									<p>{result.name}</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{/* Type dropdown */}
			<div
				className={`${
					step === 2 ? (show ? 'visible' : 'invisible') : 'invisible'
				}`}
			>
				<div className='m-suggestions m-suggestions-name bg-white mt-1 w-2/4 h-64 absolute rounded-xl overflow-scroll'>
					<ul className='p-5'>
						<li
							onClick={() => {
								setState({
									...state,
									type: 'male',
									show: false,
								});
							}}
							key='1'
							data-name='male'
							className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							// onClick={selectDropDownvalue}
						>
							<p>
								<b>Male</b>
							</p>
						</li>
						<li
							onClick={() => {
								setState({
									...state,
									type: 'female',
									show: false,
								});
							}}
							key='2'
							data-name='female'
							className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							// onClick={selectDropDownvalue}
						>
							<p>
								<b>Female</b>
							</p>
						</li>
						<li
							onClick={() => {
								setState({
									...state,
									type: 'other',
									show: false,
								});
							}}
							key='3'
							data-name='other'
							className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							// onClick={selectDropDownvalue}
						>
							<p>
								<b>Other</b>
							</p>
						</li>
					</ul>
				</div>
			</div>

			{/* Location dropdown */}
			<div
				className={`${
					location ? (show ? 'visible' : 'invisible') : 'invisible'
				}`}
			>
				<div className='m-suggestions m-suggestions-name bg-white mt-1 w-2/4 h-64 absolute rounded-xl overflow-scroll'>
					<ul className='p-5'>
						<li
							data-name='Lahore,Pakistan'
							className='flex fle-row align items-center mt-1 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow p-2'
							// onClick={selectDropDownvalue}
						>
							<img
								className='w-16 rounded-lg mr-2'
								src='https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
								alt='Stylo Salon'
							/>
							<p>Stylo Salon</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MobileSearch;
