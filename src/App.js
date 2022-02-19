import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';

import './App.css';

const App = () => {
	return (
		<>
			<button className='btn btn-success me-2 mt-2'>
				<FontAwesomeIcon icon={faAppleWhole} />
				hello
			</button>
			<button className='btn btn-success me-2'>hello</button>
		</>
	);
};

export default App;
