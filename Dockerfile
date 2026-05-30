FROM python:3.12-slim

WORKDIR /app

RUN pip install uv

COPY backend/pyproject.toml ./backend/
RUN uv pip install --system fastapi "uvicorn[standard]"

COPY backend/ ./backend/
COPY frontend/out/ ./frontend/out/

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
