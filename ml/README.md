# ML Services

AI/ML services for the Career Guidance Platform using Python, TensorFlow, and Scikit-learn.

## Structure

- `recommender/` - Recommendation engine for course/career matching
- `dropout_predictor/` - Dropout risk prediction model
- `embeddings/` - Skill, interest, and job vector encoders
- `notebooks/` - Jupyter notebooks for analysis and training
- `data/` - AI datasets (raw and processed)
- `utils/` - Common ML utilities (cleaning, metrics, etc.)

## Setup

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running Services

```bash
# Start recommendation service
python recommender/service.py

# Start dropout predictor service
python dropout_predictor/service.py
```

## Training Models

See notebooks directory for training examples.
