FROM golang

RUN git clone https://github.com/tj/n.git && cd n && make install \
    && n lts

RUN go get github.com/lambrospetrou/gomicroblog

ENV APP_DIR "/app"
COPY ./ "$APP_DIR"
WORKDIR "$APP_DIR"
RUN make prepare

VOLUME ["/mnt/host"]
