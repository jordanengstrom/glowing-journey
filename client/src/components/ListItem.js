import { useState } from 'react';
import Modal from './Modal';
import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';


const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p>{task.title}</p>
          <ProgressBar/>
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete">DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
      </li>
    );
  }
  
  export default ListItem;
  