type MediaResponse = {
  data: Data;
}

type Data = {
  Media: Media;
}

type Media = {
  id:         number;
  title:      Title;
  coverImage: CoverImage;
}

type CoverImage = {
  extraLarge: string;
  large?: string;
}

type Title = {
  romaji:  string;
  english: string;
  native:  string;
}
