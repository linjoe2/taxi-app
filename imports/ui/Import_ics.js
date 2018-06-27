import React from 'react';
import Menu from './Menu'
import Dropzone from 'react-dropzone'
import AwesomeICS from 'awesome-ics'

function loopBlock(calendar) {
	for (var i = calendar.length - 1; i >= 0; i--) {
		console.log(calendar[i].properties[25])
	};

}

export default class Import extends React.Component {
  constructor() {
    super()
    this.state = { 
    	files: [], 
    	accepted: [],
      	rejected: []
    }
  }

  onDrop(acceptedFiles) {
		acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            var calendar = new AwesomeICS.Calendar().convertFromString(fileAsBinaryString);
            loopBlock(calendar.blocks)
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
    });    
		

  }



  render() {
    return (
      <section>
      	<Menu/>
        <div className="dropzone">
          <Dropzone
            accept=".ics"
            onDrop={this.onDrop.bind(this)}
          >
            <p>Sleep hier je bestand(en) heen of click hier</p>
            <p>enkel *.ics bestanden zijn toegestaan</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

<Import />