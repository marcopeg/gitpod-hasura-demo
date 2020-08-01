start:
	docker-compose up -d migrations && \
	(cd frontend && npm i && npm start)