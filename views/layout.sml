doctype html
html
  head
    block(name='meta')
      meta(name='description' content='A collaborative space for Toronto media arts organizations, media-based artists and the Queen West Triangle community.')
      meta(name='keywords' content='toronto media arts, toronto media arts cluster, media-based arts, electronic arts, computer integrated media, toronto media arts center, media arts collective')
      meta(name='viewport' content='width=device-width, initial-scale=1.0')
      meta(name='google-site-verification' content='ArLdqonWlRvHkvmHpdwdW3nxGnct3sJE--rDYC-Y0Mo')
    block(name='title')
      title Toronto Media Arts Centre (TMAC)
    block(name='stylesheets')
      link(rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css' integrity='sha384-2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj' crossorigin='anonymous')
      link(rel='stylesheet' href='css/index.css')
      link(rel='stylesheet' href='https://calendly.com/assets/external/widget.css')

  body(role='document' id='{{ pageId }}')
    block(name='content')
    block(name='footer')
      include(src='/includes/footer.sml')
    block(name='javascript')
     script(src='js/main.js' defer)
     script(src="https://calendly.com/assets/external/widget.js" type="text/javascript")
