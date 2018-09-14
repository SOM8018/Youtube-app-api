$(document).ready(function(){
    var key="AIzaSyC0CbKwcAmh4Wp7IuulWIoPB3PPqPPx_fg";
    var playlist_id="PLwGdqUZWnOp0NUuwR85Kq-wrDA2AVY1Ku";
    var url ="https://www.googleapis.com/youtube/v3/playlistItems";

    var option ={
        part :"snippet",
        key :key,
        maxResults : 10,
        playlistId: playlist_id,
    }
    loadvids();
    function loadvids()
    {
        $.getJSON(url,option,function(data){
            console.log(data);
            var id= data.items[0].snippet.resourceId.videoId;
            mainvid(id);
            resultloop(data)
        })
    }
    function mainvid(id)
    {
        $('#video').html(`
        <iframe width="560" height="280" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        
        `);
    }
    function resultloop(data)
    {
        $.each(data.items,function(i,item){
            var thumb = item.snippet.thumbnails.medium.url;
            var Title= item.snippet.title;
            var description = item.snippet.description.substring(0,100);
            var vid = item.snippet.resourceId.videoId;
            $('main').append(`
                <article class="item" data-key="${vid}">
                    <img src="${thumb}" alt="img" class="thumb">
                    <div class="details">
                        <h4>${Title}</h4>
                    <p>${description}</p>
                    </div>
                </article>
            `);
        }) 
    }
    $('main').on('click','article',function(){
        var id = $(this).attr('data-key');
        mainvid(id);
    })
})