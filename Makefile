.PHONY: help dev prod build clean logs stop

# Default target
help: ## Show this help message
	@echo "Security Awareness Training - Docker Commands"
	@echo "=========================================="
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Development commands
dev: ## Start development server with hot reload
	docker-compose -f docker-compose.dev.yml up --build

dev-detach: ## Start development server in background
	docker-compose -f docker-compose.dev.yml up --build --detach

# Production commands
prod: ## Build and run production server
	docker-compose -f docker-compose.prod.yml up --build --detach

prod-local: ## Build production image only
	docker build --target prod -t security-training:latest .

# Utility commands
build: ## Build all Docker images
	docker-compose build

logs: ## Show container logs
	docker-compose logs -f

stop: ## Stop all containers
	docker-compose down

clean: ## Remove containers, networks, and images
	docker-compose down --remove-orphans
	docker system prune -f

clean-all: ## Remove everything including volumes
	docker-compose down --volumes --remove-orphans
	docker system prune -af

# Testing commands
test-dev: ## Test development container
	docker build --target dev -t security-training:test .
	docker run --rm -p 5173:5173 security-training:test

test-prod: ## Test production container
	docker build --target prod -t security-training:prod-test .
	docker run --rm -p 8080:80 security-training:prod-test

# Deployment commands
export-image: ## Export production image
	docker save security-training:latest | gzip > security-training-latest.tar.gz

import-image: ## Import production image
	gunzip -c security-training-latest.tar.gz | docker load

# Monitoring commands
ps: ## Show running containers
	docker-compose ps

stats: ## Show container resource usage
	docker stats

# Development utilities
shell: ## Open shell in development container
	docker-compose -f docker-compose.dev.yml exec app sh

shell-prod: ## Open shell in production container
	docker-compose -f docker-compose.prod.yml exec app sh
