export class ServerRequestsUrls {
  public static Url = 'http://2.92.82.216:8080/';
  public static Listen = ServerRequestsUrls.Url + 'getSong?download=false&id=';
  public static Download = ServerRequestsUrls.Url + 'getSong?download=true&id=';
  public static Novelties = ServerRequestsUrls.Url + 'getMetadataOfNewSongs';
  public static Top = ServerRequestsUrls.Url + 'getMetadataOfPopularSongs';
  public static Add = ServerRequestsUrls.Url + 'addSong';
  public static Search = ServerRequestsUrls.Url + 'searchSongs?searchString=';
  public static SearchPlaylists = ServerRequestsUrls.Url + 'searchPlaylists?searchString=';
  public static AddPlaylist = ServerRequestsUrls.Url + 'addPlaylist';
  public static DownloadSongs = ServerRequestsUrls.Url + 'getSongsInZip';
}
