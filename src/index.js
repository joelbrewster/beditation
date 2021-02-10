import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const rain = "./audio/test.mp3";
const water = "./audio/test2.mp3";

const TRACKS = [
    { id: 1, title: "rain" },
    { id: 2, title: "water" },
];

class App extends React.Component {
    state = {
	selectedTrack: null,
	player: "stopped",
    };

    componentDidUpdate(prevProps, prevState) {
	if (this.state.selectedTrack !== prevState.selectedTrack) {
	    let track;
	    switch (this.state.selectedTrack) {
            case "rain":
		track = rain;
		break;
            case "water":
		track = water;
		break;
            default:
		break;
	    }
	    if (track) {
		this.player.src = track;
		this.player.play();
		this.setState({ player: "playing", duration: this.player.duration });
	    }
	}

	if (this.state.player !== prevState.player) {
	    if (this.state.player === "stopped") {
		this.player.pause();
		this.player.currentTime = 0;
		this.setState({ selectedTrack: null });
	    } else if (
		this.state.player === "playing" &&
		    prevState.player === "paused"
	    ) {
		this.player.play();
	    }
	}
    }

    render() {
	const list = TRACKS.map((item) => {
	    return (
		<div
		    className="col tracks"
		    key={item.id}
		    onClick={() => this.setState({ selectedTrack: item.title })}
		    style={{
			fontWeight: item.title === this.state.selectedTrack && "bold",
		    }}
		>
		    {item.title}
		</div>
	    );
	});

	return (
	    <>
		<div className="player">
		    <div className="tracklist col">{list}</div>
		    {this.state.player !== "stopped" && (
			<div className="buttons">
			    <button onClick={() => this.setState({ player: "stopped" })}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
				    <path d="M500 10C229.4 10 10 229.4 10 500s219.4 490 490 490 490-219.4 490-490S770.6 10 500 10zm0 918.7C263.6 928.7 71.3 736.4 71.3 500 71.3 263.6 263.6 71.3 500 71.3c236.4 0 428.7 192.3 428.7 428.7 0 236.4-192.3 428.7-428.7 428.7z" />
				    <path d="M622.5 316.2h-245c-33.8 0-61.2 27.4-61.2 61.2v245c0 33.8 27.4 61.3 61.2 61.3h245c33.8 0 61.3-27.4 61.3-61.3v-245c-.1-33.7-27.5-61.2-61.3-61.2z" />
				</svg>
			    </button>
			</div>
		    )}
		</div>
		<audio ref={(ref) => (this.player = ref)} />
	    </>
	);
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

