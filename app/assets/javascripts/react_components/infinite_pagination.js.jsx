/** @jsx React.DOM */

var InfinitePagination = React.createClass({
  getInitialState: function () {
    return {current_page: 1, total_pages: this.props.total_pages};
  },

  handleClick: function (e) {
    e.preventDefault();
    var page = this.props.current_page + 1;
    var self = this;
    var spinner = "<div class='spinner js-spinner'>" + "<div class='rect1'></div>" + "<div class='rect2'></div>" + "<div class='rect3'></div>" + "<div class='rect4'></div>" + "<div class='rect5'></div>" + "</div>";

    $(e.target).html(spinner);

    $.ajax({
      url: '/',
      type: 'GET',
      data: {page: page},
      complete: function ( data ) {
        $('.js-spinner').remove();
        $('#load-more-container').append(data.responseText);
        self.setState({current_page: page});
      }
    });
  },

  render: function () {
    if (this.state.current_page === this.state.total_pages) {
      var paginationTrigger = (<span />);
    }
    else {
      var paginationTrigger = (<a href='#' id='paginate-trigger' onClick={ this.handleClick }>Load more songs</a>);
    }

    return (
      <div>
        { paginationTrigger }
      </div>
    );
  }
});