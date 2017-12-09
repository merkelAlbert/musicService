export class ServerRequestsUrls {
  public static Url = 'http://128.75.155.55:8080/';
  public static Listen = ServerRequestsUrls.Url + 'getSong?isDownload=false&id=';
  public static Download = ServerRequestsUrls.Url + 'getSong?isDownload=true&id=';
  public static Novelties = ServerRequestsUrls.Url + 'getMetadataOfNewSongs';
  public static Top = ServerRequestsUrls.Url + 'getMetadataOfPopularSongs';
  public static Add = ServerRequestsUrls.Url + 'addSong';
  public static Search = ServerRequestsUrls.Url + 'searchSongs?searchString=';
  public static SearchPlaylists = ServerRequestsUrls.Url + 'searchPlaylists?searchString=';
  public static AddPlaylist = ServerRequestsUrls.Url + 'addPlaylist';
  public static DownloadSongs = ServerRequestsUrls.Url + 'getSongsInZip';
  public static SongsByIds = ServerRequestsUrls.Url + 'getMetadataOfSongsbyIDs';
}
