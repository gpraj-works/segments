import axios from 'axios';
import CreateSegment from './components/CreateSegment';
import PopUp from './components/layouts/PopUp';
import TopBar from './components/layouts/TopBar';

function App() {
	const baseUrl = 'https://webhook.site/d351c28c-5188-47e8-b2a9-dc10a30ed2c4';
	const submitSegment = async (data) => {
		try {
			await axios.post(baseUrl, data);
			alert('submitted');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='Dashboard'>
			<TopBar link='/' title='View Audience' />
			<PopUp>
				<PopUp.Header>
					<TopBar link='/' title='Saving Segment' />
				</PopUp.Header>
				<PopUp.Body>
					<CreateSegment onSubmit={submitSegment} />
				</PopUp.Body>
			</PopUp>
		</div>
	);
}

export default App;
