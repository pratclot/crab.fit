module.exports = async (req, res) => {
	const { eventId } = req.params;

	try {
		const query = req.datastore.createQuery('Person').filter('eventId', eventId);
		let people = (await req.datastore.runQuery(query))[0];
		people = people.map(person => ({
			name: person.name,
			availability: person.availability,
		}));

		res.send({
			people,
		});
	} catch (e) {
		console.error(e);
		res.sendStatus(404);
	}
};
