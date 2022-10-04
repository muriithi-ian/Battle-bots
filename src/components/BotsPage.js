import React from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";
function BotsPage() {
	// Fetching data from the API
	const [bots, setBots] = React.useState([]);
	const [armyBots, setArmyBots] = React.useState([]);
	const [selectedBot, setSelectBot] = React.useState(null);
	React.useEffect(() => {
		getBots();
	}, [armyBots]);
	const getBots = async () => {
		try {
			const response = await fetch("http://localhost:8002/bots");
			const data = await response.json();
			setBots(data);
		} catch (error) {
			console.error(error);
		}
	};
	// select Bot
	const selectBot = (bot) => {
		const addMyBot = bots.filter((b) => b.id === bot.id);
		setSelectBot(addMyBot[0]);
	};
	const enlistBot = (bot) => {
		const addMyBot = bots.filter((b) => b.id === bot.id);
		const botExists = armyBots.find((b) => b.id === bot.id);
		if (!botExists) {
			setArmyBots([...armyBots, addMyBot[0]]);
		}
	};
	const deleteBot = async (bot) => {
		try {
			await fetch(`http://localhost:8002/bots/${bot}`, {
				method: "DELETE",
			});
			const removeMyBot = armyBots.filter((b) => b.id !== bot);
			setArmyBots(removeMyBot);
		} catch (error) {
			console.log(error);
		}
	};
	const resetSelectedBot = () => {
		setSelectBot(null);
	};
	const deEnlistBot = (bot) => {
		const removeMyBot = armyBots.filter((b) => b.id !== bot.id);
		setArmyBots(removeMyBot);
	};
	return (
		<div>
			<YourBotArmy
				army={armyBots}
				deleteBot={deleteBot}
				selectBot={selectBot}
				removeBot={deEnlistBot}
			/>
			{!selectedBot && (
				<BotCollection
					bots={bots}
					selectBot={selectBot}
					deleteBot={deleteBot}
				/>
			)}
			{selectedBot && (
				<BotSpecs
					enlistBot={enlistBot}
					resetSelectedBot={resetSelectedBot}
					bot={selectedBot}
				/>
			)}
		</div>
	);
}
export default BotsPage;
