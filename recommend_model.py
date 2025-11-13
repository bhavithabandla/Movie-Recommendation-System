import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

class MovieLensRecommender:
    def __init__(self, path="./ml-100k/u.item", genre_path="./ml-100k/u.genre"):
        # Load genres
        genre_df = pd.read_csv(genre_path, sep="|", names=["genre", "id"], encoding="latin-1")
        self.genres = genre_df["genre"].tolist()

        # Load movies
        cols = ["movie_id", "title", "release_date", "video_release_date", "IMDb_URL"] + self.genres
        self.movies = pd.read_csv(path, sep="|", names=cols, encoding="latin-1")

        # Create a combined genre string for each movie
        self.movies["combined"] = self.movies[self.genres].apply(
            lambda row: " ".join([genre for genre, val in zip(self.genres, row) if val == 1]),
            axis=1,
        )

        # TF-IDF vectorization on genre combinations
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.tfidf_matrix = self.vectorizer.fit_transform(self.movies["combined"])

    def get_genres(self):
        """Return all unique genres for dropdowns."""
        return self.genres

    def recommend(self, mood="", genre="", language="", duration="", type_=""):
        """Return top 5 recommended movies based on genre & mood keywords."""
        query = f"{mood} {genre} {type_}"
        query_vec = self.vectorizer.transform([query])
        cosine_sim = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        top_indices = cosine_sim.argsort()[-5:][::-1]
        return self.movies.iloc[top_indices][["title", "combined"]].to_dict(orient="records")
