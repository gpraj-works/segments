import { useState } from 'react';
import { SCHEMA_VARIABLES } from '../utils/constant.js';

const Badge = ({ color, title }) => {
	return (
		<div
			className='d-inline-flex align-items-center gap-1'
			style={{ fontSize: '0.8rem' }}
		>
			<em className={`bi bi-circle-fill text-${color || 'secondary'}`}></em>
			<span>- {title}</span>
		</div>
	);
};

const CreateSegment = ({ onSubmit }) => {
	const [schema, setSchema] = useState([]);
	const [segmentName, setSegmentName] = useState('');
	const [selected, setSelected] = useState(false);

	const addSchema = () => {
		if (!selected || schema.find((item) => item === selected)) {
			return setSelected(null);
		}
		setSchema([...schema, selected]);
		setSelected(false);
	};

	const handleSubmit = () => {
		if (!segmentName.length) {
			alert('segment empty');
		}

		onSubmit({
			segment_name: segmentName,
			schema: SCHEMA_VARIABLES.map(
				({ label, value }) => schema.includes(value) && { [value]: label }
			).filter((item) => item !== false),
		});
	};

	const SelectedSchema = ({ value }) => {
		const [err, setErr] = useState(false);
		const color = value === 'account_name' ? 'text-danger' : 'text-success';

		const updateSchema = (add, remove) => {
			if (schema.find((item) => item === add)) return setErr(!err);
			let updated = [...schema.filter((item) => item !== remove), add];
			setSchema(updated);
			setErr(!err);
		};

		const removeSchema = () => {
			setSchema(schema.filter((item) => item !== value));
		};

		return (
			<div className='d-flex align-items-center gap-2 mb-3'>
				<span
					className={`bi bi-circle-fill ${color}`}
					style={{ fontSize: '0.8rem' }}
				></span>
				<select
					className={`form-select ${err ? 'border-danger' : ''}`}
					defaultValue={value}
					onChange={(e) => updateSchema(e.target.value, value)}
				>
					{SCHEMA_VARIABLES.map((item, index) => (
						<option value={item.value} key={index}>
							{item.label}
						</option>
					))}
				</select>
				<button type='button' className='btn btn-light' onClick={removeSchema}>
					<em className='bi bi-x-lg'></em>
				</button>
			</div>
		);
	};

	return (
		<div className='h-100 d-flex flex-column justify-content-between'>
			<div className='p-4'>
				<div className='mb-3'>
					<label htmlFor='segmentName' className='form-label'>
						Name of the segment
					</label>
					<input
						type='text'
						className='form-control'
						id='segmentName'
						placeholder='Ex: last_10_days'
						onChange={(e) => setSegmentName(e.target.value)}
						value={segmentName}
					/>
				</div>
				<p className='mb-3'>
					To save your segment, you need to add the schemas to build query.
				</p>
				<div className='d-flex gap-3 justify-content-end mb-3'>
					<Badge title='User Traits' color='success' />
					<Badge title='Group Traits' color='danger' />
				</div>
				{schema.map((item, index) => (
					<SelectedSchema value={item} key={index} />
				))}
				<div className='d-flex align-items-center gap-2'>
					<span className='bi bi-circle-fill text-secondary'></span>
					<select
						className={`form-select ${selected === null && 'border-danger'}`}
						onChange={(e) => setSelected(e.target.value)}
					>
						{!selected && (
							<option disabled selected>
								Add schema to segment
							</option>
						)}
						{SCHEMA_VARIABLES.map((item, index) => (
							<option value={item.value} key={index}>
								{item.label}
							</option>
						))}
					</select>
				</div>
				<div className='mb-3'>
					<button
						type='button'
						className='btn btn-link text-primary fw-bold text-decoration-none'
						onClick={addSchema}
					>
						<span className='fs-5'>&#x2B;</span> Add new schema
					</button>
				</div>
			</div>
			<div className='d-inline-flex gap-3 bg-light p-4'>
				<button className='btn btn-primary text-white' onClick={handleSubmit}>
					Submit
				</button>
				<button className='btn btn-outline-danger'>Cancel</button>
			</div>
		</div>
	);
};

export default CreateSegment;
