import { Component, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { imageHandler } from '../../utils/image-handler';
import { Professional } from '../../models/professional.model';

/**
 * @description List of all professionals available.
 */
@Component({
    tag: 'professional-picker',
    styleUrl: 'professional-picker.css',
    shadow: false
})
export class ProfessionalPicker {

    @Prop({ mutable: true }) professionals: Professional[] = [];
    @Prop({ mutable: true }) selectedProfessionalId: string = null;

    @State() professionalsRefined: Array<{ professional: Professional, img: string }> = [];

    @Event() onProfessionalUpdated: EventEmitter;

    @Watch('professionals')
    professionalsOnChange() {
        this.initialize();
    }

    componentDidLoad(): void {
        this.initialize();
    }

    private initialize(): void {
        if (this.professionals.length) {
            this.handlingProfessionalsImg();
        }
    }

    /**
     * @description Optimizing images for each professional. In case of a professional without a picture,
     * sets a default user image.
     */
    private handlingProfessionalsImg(): void {
        this.professionalsRefined = [];

        this.professionals.map((professional) => {
            imageHandler(professional.picture)
                .then((img) => {
                    this.professionalsRefined = [...this.professionalsRefined, { professional, img }];
                });
        });
    }

    private setSelectedProfessional(professional: Professional): void {
        this.selectedProfessionalId = professional.id;
        this.onProfessionalUpdated.emit(professional);
    }

    private isSelectedProfessional(professionalId: string): boolean {
        const activeProfessionalId = this.selectedProfessionalId || this.professionals[0].id;
        return professionalId === activeProfessionalId;
    }

    render(): JSX.Element {
        return (
            <div class="picker-container">
                {this.professionalsRefined.map(element =>
                    <figure
                        class="professional"
                        onClick={() => this.setSelectedProfessional(element.professional)}>
                        <img
                            class={{ 'selected': this.isSelectedProfessional(element.professional.id) }}
                            src={element.img} />
                        <figcaption>{element.professional.name}</figcaption>
                    </figure>
                )}
            </div>
        );
    }
}
